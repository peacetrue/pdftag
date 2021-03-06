import React from "react";
import {Link} from 'react-router-dom';
import {Button} from "react-admin";
import PublishIcon from '@material-ui/icons/Publish';

export const ImportsButton = (props) => (
    <Button
        component={Link}
        to={`/phone-tags/imports`}
        label={'批量导入标签'}
        onClick={(e) => e.stopPropagation()}
        {...props}
    >
        <PublishIcon/>
    </Button>
);
