import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Link, useHistory } from 'react-router-dom';
import {
    Row,
    Image,
    Modal,
    Form,
    Button,
    Carousel
} from 'react-bootstrap';

import {
    hidePopUp,
    requestComments,
    showPopUp
} from '../store/fetchComments';
import { postComment } from '../store/postComment';

export const Main = () => {
    const [id, setId] = useState(null);
    const fetchedPhotos = useSelector(state => state.fetchPhotos.fetchedPhotos);
    const { show, comments } = useSelector(state => state.fetchComments);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const searchParams = window.location.pathname.slice(1);

        if (searchParams) openModalHandler();
    }, []);

    const openModalHandler = async () => {
        await dispatch(showPopUp());
        setId(window.location.pathname.slice(1));
        dispatch(requestComments());
    };

    const sendRequest = e => {
        e.preventDefault();

        dispatch(postComment());
    };

    const onCloseModalHandler = () => {
        history.push('/');
        dispatch(hidePopUp());
    };

    return (
        <Row className="main">
            <Carousel interval={5000}>
                {fetchedPhotos.length && fetchedPhotos.map(item => (
                        <Carousel.Item key={item.id}>
                            <Link to={`/${item.id}`}>
                                <Image src={item.url} onClick={openModalHandler} />
                            </Link>
                        </Carousel.Item>
                    )
                )}
            </Carousel>
            <Route path="/:userSearch">
                {comments && +id === comments.id &&
                <Modal show={show} onHide={onCloseModalHandler} animation={false} size="xl">
                    <Modal.Header closeButton />
                    <Modal.Body>
                        <Image className="pop-up-div pop-up-img" src={comments.url} fluid />
                        <div className="pop-up-div">
                            <h1>Comments:</h1>
                            <ul>
                                {comments?.comments.map(item => (
                                    <li key={item.id}>{item.text}</li>
                                ))}
                                {!comments.comments.length && <div>No comments yet :( You can be first!</div>}
                            </ul>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Form id="comments" onSubmit={e => sendRequest(e)}>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Your name:</Form.Label>
                                <Form.Control type="input" placeholder="Enter your name" />
                            </Form.Group>
                            <Form.Group controlId="formBasicComment">
                                <Form.Label>Your comment:</Form.Label>
                                <Form.Control type="input" placeholder="Enter your comment" />
                            </Form.Group>
                            <Button variant="primary" type="submit">Comment</Button>
                        </Form>
                    </Modal.Footer>
                </Modal>}
            </Route>
        </Row>
    );
};
