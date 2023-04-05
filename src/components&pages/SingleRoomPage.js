import React, { useEffect, useState  } from 'react';
import { ROOMS_TYPES, ROOM_TYPE_LABEL, ROOM_OCCUPANCY_LIST } from "../store/roomsTypes";
import { Button, Carousel, Col, Descriptions, List, Row, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CheckOutlined, HomeOutlined } from '@ant-design/icons';
import ModalCheckIn from "./ModalCheckIn"
import ModalCheckOut from "./ModalCheckOut"


const getSingleRoom = (state, roomId) => {
  return state.room.items.find(element => element.id == roomId);
}//по id достаю комнаты 

const SingleRoomPage = () => {
  const { roomId } = useParams();
  const room = useSelector((state) => getSingleRoom(state, roomId));
  
  return room ? (
    <>
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
                {room.gallery.map((imageUrl) => <img key={imageUrl} src={imageUrl} alt={room.type} className="slider-image" />)}          
          </Carousel>
        </Col>
        <Col span={12}>
          <Row justify="space-between">
            <Col>
              <Typography.Title level={2} underline>{`Room ${room.number}`}</Typography.Title>
            </Col>
            <Col>
              <ModalCheckIn room={room}/>
              <ModalCheckOut room={room}/>

              {/* <Button type="primary" className="room-button" disabled={room.isCheckedIn}>Check In</Button> */}
              {/* <Button type="primary" className="room-button" disabled={!room.isCheckedIn}>Check Out</Button> */}
            
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Descriptions
                labelStyle={{ fontWeight: 'bold', alignSelf: 'center' }}
                column={1}
              >
                <Descriptions.Item label="Type">{ROOM_TYPE_LABEL[room.type]}</Descriptions.Item>
                <Descriptions.Item label="Occupancy">{room.occupancy}</Descriptions.Item>
                <Descriptions.Item label="Price">{`${room.price}$`}</Descriptions.Item>
                <Descriptions.Item label="Guest">{room.guest}</Descriptions.Item>
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
            <Descriptions.Item label="Description">{room.description}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </>  
   
  ): <p>No data</p>
};
export default SingleRoomPage;