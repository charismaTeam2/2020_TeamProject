import pymysql #디비 커넥터 임포트

class MysqlController: #디비 CONFIG
    def __init__(self, host, port, id, pw, db_name):
        self.conn = pymysql.connect(host=host, port=port, user= id, password=pw, db=db_name,charset='utf8')
        self.curs = self.conn.cursor()

    def insert_values(self,d_num, da2, src, color, color_num , user): #값 입력
        #sql = 'INSERT INTO tdate (da1,da2,in1) VALUES (%s,%s,%s)'
        sql = 'INSERT INTO CLOTHES_TABLE(c_division, c_name, c_image, c_color, c_color_num, c_stat, user_id) VALUES(%s, %s, %s, %s, %s, 1, %s)'
        self.curs.execute(sql,(d_num, da2, src, color, color_num , user))
        self.conn.commit()

