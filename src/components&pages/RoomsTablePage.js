import React, { useState, useMemo } from 'react';
import { Button, Table, Row, Col, Checkbox } from 'antd';
import { ROOMS_TYPES, ROOM_OCCUPANCY_LIST } from "../store/roomsTypes";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RoomsTable() {
  const getRoomsState = (state) => state.room.items;
  const rooms = useSelector(getRoomsState) || [];
  const [isChecked, setIsChecked] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const filteredRooms = useMemo(() => (isChecked ? rooms.filter((room) => room.isCheckedIn !== isChecked) : rooms), [rooms, isChecked]);
  const guestsOptions = useMemo(() => (!isChecked
    ? rooms
      .filter((room) => room.guest)
      .map((room) => ({ text: room.guest, value: room.guest }))
    : []
  ), [rooms, isChecked]);
  
  const columns = [
    //в колонку маплю все элементы 
    {
      title: 'Number',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <span>{type}</span>, //если надо отобраз элем нестандартно (напр, добав иконку)
      filters: Object.values(ROOMS_TYPES).map((type) => ({ text: type, value: type })), //добавл элем в выпадающ список
      onFilter: (type, record) => record.type === type, //фильтрация 
      filteredValue: filteredInfo.type || null,
    },
    {
      title: 'Occupancy',
      dataIndex: 'occupancy',
      key: 'occupancy',
      //три строчки ниже - это логика фильтра occupancy
      filters: ROOM_OCCUPANCY_LIST.map((occupancy) => ({ text: occupancy, value: occupancy })), //тут то, что должно быть в выпадающем списке
      onFilter: (occupancy, record) => record.occupancy == occupancy, //тут задается то,что я выбрала из выпадающего списка (по какой логике отфильтровывать)
      filteredValue: filteredInfo.occupancy || null, //тут отображение уже отфильтрованного 
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>{`${text}$`}</span>,
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
    },
    {
      title: 'Guest',
      dataIndex: 'guest',
      key: 'guest',
      filters: guestsOptions,
      onFilter: (text, record) => record.guest.startsWith(text),
      filteredValue: filteredInfo.guest || null,
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

/*   useEffect(() => {
    if (!rooms.length) {
      dispatch(getRooms());
    }
  }, [rooms]);
 */
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
