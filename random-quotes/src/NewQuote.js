import React from 'react';
import {Button} from 'react-bootstrap';

export default function NewQuote(props){
    return (
        <Button className="alignt-right" onClick={() => props.onClick()}>
            New Quote
        </Button>
    )
}