import React, { useEffect, useState  } from 'react';
import { ROOMS_TYPES, ROOM_TYPE_LABEL, ROOM_OCCUPANCY_LIST } from "../store/roomsActionTypes";
import { Button, Carousel, Col, Descriptions, List, Row, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CheckOutlined, HomeOutlined } from '@ant-design/icons';
import { getRooms } from '../store/actionRooms';

const propTypes = {};
//propTypes для проверки правильности передаваемых свойств в компонент, а также для документирования API компонента
const getSingleRoom = (state, roomId) => state.room.items[roomId];//по id достаю комнаты 



const SingleRoomPage = () => {
  const { roomId } = useParams();

  //const { search } = useLocation(); //извлекаю search из useLocation(он показ URL), переменной search присваивается значение параметров строки запроса текущего URL.
  const room = useSelector((state) => getSingleRoom(state, roomId));

  //Позже в коде значение search используется в качестве аргумента для функции getSingleRoom, которая выбирает одну комнату из состояния, используя идентификатор, полученный из строки search.
  const dispatch =useDispatch();
  useEffect(() => {
    if (!room?.length) {
      dispatch(getRooms());
    }
  }, [room]);
  
  return room ? (
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Button type="link">
            <Link to="/">
              <HomeOutlined />
              &nbsp;
              Back Home
            </Link>
          </Button>
        </Col>
        <Col span={12}>
          <Carousel>
                {room.Gallery.map((imageUrl) => <img key={imageUrl} src={imageUrl} alt={room.Type} className="slider-image" />)}          
          </Carousel>
        </Col>
        <Col span={12}>
          <Row justify="space-between">
            <Col>
              <Typography.Title level={2} underline>{`Room ${room.Number}`}</Typography.Title>
            </Col>
            <Col>
              <Button type="primary" className="room-button" disabled={room.isCheckedIn}>Check In</Button>
              <Button type="primary" className="room-button" disabled={!room.isCheckedIn}>Check Out</Button>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Descriptions
                labelStyle={{ fontWeight: 'bold', alignSelf: 'center' }}
                column={1}
              >
                <Descriptions.Item label="Type">{ROOM_TYPE_LABEL[room.Type]}</Descriptions.Item>
                <Descriptions.Item label="Occupancy">{room.Occupancy}</Descriptions.Item>
                <Descriptions.Item label="Price">{`${room.Price}$`}</Descriptions.Item>
                <Descriptions.Item label="Guest">{room.Guest}</Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={12}>
              <Descriptions
                layout="vertical"
                labelStyle={{ fontWeight: 'bold' }}
              >
                <Descriptions.Item label="Features">
                  <List
                    size="small"
                    dataSource={room.Features}
                    renderItem={(item) => (
                      <List.Item>
                        <CheckOutlined />
                        &nbsp;
                        {item}
                      </List.Item>
                    )}
                  />
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Descriptions labelStyle={{ fontWeight: 'bold' }} column={2}>
            <Descriptions.Item label="Description">{room.Description}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
   
  ): <div>Not enought data to show</div>
};

SingleRoomPage.propTypes = propTypes;
export default SingleRoomPage;