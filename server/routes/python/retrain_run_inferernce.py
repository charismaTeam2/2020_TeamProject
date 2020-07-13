# -*- coding: utf-8 -*-

"""Inception v3 architecture 모델을 retraining한 모델을 이용해서 이미지에 대한 추론(inference)을 진행하는 예제"""

import sys
import numpy as np
#import tensorflow as tf
#import tensorflow as tf
import tensorflow as tf
#from tensorflow import tensorflow as tf
import DBCon
import retrain_run_inferernce_color  # 각각의 모델 불러오기
import retrain_run_inferernce_topinfo #  각각의 모델 불러오기
import retrain_run_inferernce_pantsinfo # 각각의 모델 불러오기 색, 상의 세부, 하의 세부

mysql_controller = DBCon.MysqlController('localhost', 3308, 'root','root','web')  #DB 정보 입력
src = 'C:/project/views/public/clothes/'+sys.argv[2]
imagePath = src    #'C:/project/views/public/clothes/a_black_22.jpg'   #src + sys.argv[1]      # 추론을 진행할 이미지 경로!!!
modelFullPath = 'C:/project/server/routes/python/dataset/top_pants_suit.pb'  #'./dataset/top_pants_suit.pb'     # 읽어들일 graph 파일 경로
labelsFullPath = 'C:/project/server/routes/python/dataset/top_pants_suit.txt'   # 읽어들일 labels 파일 경로


def create_graph():
    """저장된(saved) GraphDef 파일로부터 graph를 생성하고 saver를 반환한다."""
    # 저장된(saved) graph_def.pb로부터 graph를 생성한다.
    with tf.gfile.FastGFile(modelFullPath, 'rb') as f:
        graph_def = tf.GraphDef()
        graph_def.ParseFromString(f.read())
        _ = tf.import_graph_def(graph_def, name='')


def run_inference_on_image():
    answer = None
    clist = {}

    if not tf.gfile.Exists(imagePath):
        tf.logging.fatal('File does not exist %s', imagePath)
        return answer

    image_data = tf.gfile.FastGFile(imagePath, 'rb').read()

    # 저장된(saved) GraphDef 파일로부터 graph를 생성한다.
    create_graph()

    with tf.Session() as sess:

        softmax_tensor = sess.graph.get_tensor_by_name('final_result:0')
        predictions = sess.run(softmax_tensor,
                               {'DecodeJpeg/contents:0': image_data})
        predictions = np.squeeze(predictions)

        top_k = predictions.argsort()[-5:][::-1]  # 가장 높은 확률을 가진 5개(top 5)의 예측값(predictions)을 얻는다.
        f = open(labelsFullPath, 'r')
        lines = f.readlines()
        print(lines)
        labels = [w.replace("\n", "") for w in lines]

        for node_id in top_k:
            human_string = labels[node_id]
            score = predictions[node_id]
            clist[human_string] = score
            print('%s (score = %.5f)' % (human_string, score))

        top = clist.get('top')
        pants = clist.get('pants')
        suit = clist.get('suit')

        print(top,pants,suit)

        da1 = 'suit'
        da2 = str(suit)

    tf.Session().close()  # 가장 중요함!!!! 텐서플로우의 세션을 닫고
    tf.reset_default_graph() # 사용한 그래프를 리셋시킴 이거 없으면 그래프가 뒤에것과 뒤섞여 결과값이 이상해짐

    if top > pants and top > suit:
        da1 = 'top'
        da2 = str(top)
        info = retrain_run_inferernce_topinfo.run_inference_on_image(imagePath)

    if pants > top and pants > suit:
        da1 = 'pants'
        da2 = str(pants)
        info = retrain_run_inferernce_pantsinfo.run_inference_on_image(imagePath)

    tf.Session().close()
    tf.reset_default_graph()

    color = retrain_run_inferernce_color.run_inference_on_image(imagePath)

    # json-> 확장성 고려.
    if(da1 == 'top'):
        d_num = 1
    elif(da1 == 'pants'):
        d_num = 2
    elif(da1 == 'suit'):
        d_num = 3

    if(color == 'white'):
        color_num = 0
    elif(color == 'beige'):
        color_num = 1
    elif(color == 'gray'):
        color_num = 2
    elif(color == 'skyblue'):
        color_num = 3
    elif(color == 'pink'):
        color_num = 4
    elif(color == 'yellow'):
        color_num = 5
    elif(color == 'orange'):
        color_num = 6
    elif(color == 'black'):
        color_num = 7
    elif(color == 'brown'):
        color_num = 8
    elif(color == 'navy'):
        color_num = 9
    elif(color == 'green'):
        color_num = 10
    elif(color == 'red'):
        color_num = 11
    elif(color == 'puple'):
        color_num = 12

    f_name = sys.argv[2]
    user = sys.argv[1]
    #print(da1,info,color)
    #print("===========")
    #print(color_num)
    #print(d_num)
    #print(src)

 


    #print("종류 : " + info)
    #print("색상 : " + color)

    mysql_controller.insert_values(d_num, info, f_name, color, color_num, user)  # 값 입력 앞에 # 제거할것

if __name__ == '__main__':
    run_inference_on_image()
