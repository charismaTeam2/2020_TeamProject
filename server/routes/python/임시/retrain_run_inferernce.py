# -*- coding: utf-8 -*-

"""Inception v3 architecture 모델을 retraining한 모델을 이용해서 이미지에 대한 추론(inference)을 진행하는 예제"""

import numpy as np
import tensorflow as tf
import DBCon
import retrain_run_inferernce_color
import retrain_run_inferernce_topinfo
import retrain_run_inferernce_pantsinfo

mysql_controller = DBCon.MysqlController('localhost', 3308, 'root','root','test')

imagePath = 'C:/project/views/public/clothes/a.jpg'                                      # 추론을 진행할 이미지 경로!!!
modelFullPath = './top_pants_suit.pb'                                # 읽어들일 graph 파일 경로
labelsFullPath = './top_pants_suit.txt'

# 읽어들일 labels 파일 경로


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

    tf.Session().close()
    tf.reset_default_graph()

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

    print(da1,info,color)

    #mysql_controller.insert_values(da1,da2, 1)


if __name__ == '__main__':
    run_inference_on_image()
