import React from 'react';
import { Button } from 'react-bootstrap';

export default function Tweet(props)
{
    return (
        <Button bsStyle="primary" type="button" href={props.tweetLink} target="_blank" title="Tweet this quote!">Tweet</Button>
    );
}