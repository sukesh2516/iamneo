import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import './home.css'
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Home = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getUserData = async () => {
    const res = await axios.get('/getdata', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.data.status === 401 || !res.data) {
      console.log('error');
    } else {
      setData(res.data.getUser);
    }
  };

  const deleteUser = async (id) => {
    const res = await axios.delete(`/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.data.status === 401 || !res.data) {
      console.log('error');
    } else {
      getUserData();
      setShow(true);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
  
    setData(items);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {show && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>User Removed</Alert.Heading>
          <p>
            <Card.Title>User</Card.Title> has been removed from the database.
          </p>
        </Alert>
      )}
      <div className="container mt-2">
        <h1 className="text-center mt-2">IamNeo Talent Center</h1>
        <div className="text-end">
          <Button variant="success">
            <NavLink to="/registration" className="text-decoration-none text-white">
              Add User
            </NavLink>
          </Button>{' '}
        
        <div className="search_bar">
          <input
            type="text"
            placeholder="Search by name"
            className="form-control"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="cardList" direction="horizontal">
            {(provided) => (
              <CardContainer ref={provided.innerRef} {...provided.droppableProps}>
                {filteredData.length > 0 ? (
                  filteredData.map((s, i) => (
                    <Draggable key={s._id} draggableId={s._id} index={i}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Card style={{ width: '18rem',marginBottom: '20px' }} className="cards">
                          <Card.Img variant="top" style={{ width: '100px', height:'100px',borderRadius:'50px', textAlign: 'center', margin: 'auto' }} src={`/uploads/${s.imgpath}`} />
                            <Card.Body>
                              <Card.Title>{s.name}</Card.Title>
                              <Card.Text>Date Joined: {moment(s.date).format('YYYY/MM/DD')}</Card.Text>
                              <Card.Text>DOB: {moment(s.dob).format('YYYY/MM/DD')}</Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                              <ListGroup.Item>
                                <h3>I am Neo</h3>
                              </ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                              <Card.Link href="#" style={{ textDecoration: 'none' }}>
                                LinkedIn
                              </Card.Link>
                              <Card.Link className="remove" href="#" style={{ textDecoration: 'none' }} onClick={() => deleteUser(s._id)}>
                                Remove User
                              </Card.Link>
                            </Card.Body>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <p>No results found</p>
                )}
                {provided.placeholder}
              </CardContainer>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default Home;
