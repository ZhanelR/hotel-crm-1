import React, { useState, useMemo, useEffect } from 'react';
import { Button, Table, Row, Col, Checkbox } from 'antd';
import { ROOMS_TYPES, ROOM_TYPE_LABEL, ROOM_OCCUPANCY_LIST } from "../store/roomsActionTypes";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRoomsToStore } from "../slices/roomsSlice"; 
import MainLayout from "../layouts/MainLayout";
import { getRooms } from '../store/actionRooms';


function RoomsTable() {
  const getRoomsState = (state) => state.room.items;
  //const getSingleRoom = (state, search) => state.rooms[search];
  const rooms = useSelector(getRoomsState) || [];
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const filteredRooms = useMemo(() => (isChecked ? rooms.filter((room) => room.isCheckedIn !== isChecked) : rooms), [rooms, isChecked]);
  const guestsOptions = useMemo(() => (!isChecked
    ? rooms
      .filter((room) => room.Guest)
      .map((room) => ({ text: room.Guest, value: room.Guest }))
    : []
  ), [rooms, isChecked]);
  console.log("guestsOptions", guestsOptions);
  console.log("filteredRooms", filteredRooms);
  const columns = [
    //в колонку маплю все элементы 
    {
      title: 'Number',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      key: 'Type',
      render: (Type) => <span>{ROOM_TYPE_LABEL[Type]}</span>, //если надо отобраз элем нестандартно (напр, добав иконку)
      filters: Object.values(ROOMS_TYPES).map((Type) => ({ text: ROOM_TYPE_LABEL[Type], value: Type })), //добавл элем в выпадающ список
      onFilter: (Type, record) => record.Type === Type, //фильтрация 
      filteredValue: filteredInfo.Type || null,
    },
    {
      title: 'Occupancy',
      dataIndex: 'Occupancy',
      key: 'Occupancy',
      //три строчки ниже - это логика фильтра occupancy
      filters: ROOM_OCCUPANCY_LIST.map((Occupancy) => ({ text: Occupancy, value: Occupancy })), //тут то, что должно быть в выпадающем списке
      onFilter: (Occupancy, record) => record.Occupancy === Occupancy, //тут задается то,что я выбрала из выпадающего списка (по какой логике отфильтровывать)
      filteredValue: filteredInfo.Occupancy || null, //тут отображение уже отфильтрованного 
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
      render: (text) => <span>{`${text}$`}</span>,
      sorter: (a, b) => a.Price - b.Price,
      sortOrder: sortedInfo.columnKey === 'Price' && sortedInfo.order,
    },
    {
      title: 'Guest',
      dataIndex: 'Guest',
      key: 'Guest',
      filters: guestsOptions,
      onFilter: (text, record) => record.Guest.startsWith(text),
      filteredValue: filteredInfo.Guest || null,
    },
    {
      title: '',
      key: 'operation',
      width: 100,
      render: (text, record) => (
        <Button type="primary">
          <Link to={`/rooms/${record.id}`}>
            More information
          </Link>
        </Button>
      ),
    },
  ];

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const handleTableChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setIsChecked(false);
  };

  useEffect(() => {
    if (!rooms.length) {
      dispatch(getRooms());
    }
  }, [rooms]);

  return (
    
      <Row gutter={[24, 40]} align="middle">
        <Col span={2}>
          <Button type="primary" onClick={clearAll}>Clear all filters</Button>
        </Col>
        <Col span={6}>
          <Checkbox onChange={handleCheckboxChange} checked={isChecked}>
            Free rooms only
          </Checkbox>
        </Col>
        <Col span={24}>
          <Table
            dataSource={filteredRooms} //тут передаю уже отфильрованные комнаты через dataSource
            columns={columns}
            pagination={{ defaultPageSize: 10, position: ['bottomCenter'] }}
            hasData={!!filteredRooms.length}
            rowKey="id"
            onChange={handleTableChange}
          />
        </Col>
      </Row>

  );

}

export default RoomsTable;
