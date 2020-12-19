import * as React from "react";
import {Box, Typography} from '@material-ui/core';
import {
    DateField,
    Edit,
    Loading,
    PasswordInput,
    SaveButton,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    Toolbar,
    useGetIdentity
} from "react-admin";
import Role from "../users/role";
import Paper from '@material-ui/core/Paper';
import userRules from "../users/rules";

const EditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton/>
    </Toolbar>
);

export const Profile = ({staticContext, ...props}) => {
    const {loading: identityLoading, identity} = useGetIdentity();
    if (identityLoading) {
        return (<Loading loadingPrimary="ra.page.loading" loadingSecondary="ra.message.loading"/>);
    }
    return (
        <Box p="1em">
            <Box display="flex">
                <Box flex={2} mr="1em">
                    <Paper>
                        <Box p='1em'><Typography variant="h6">用户信息</Typography></Box>
                        <SimpleShowLayout record={identity}>
                            <TextField label={'用户名'} source="username"/>
                            {Role}
                            <DateField label={'创建时间'} source="createdTime" showTime/>
                            <DateField label={'最近修改时间'} source="modifiedTime" showTime/>
                        </SimpleShowLayout>
                    </Paper>
                </Box>
                <Box flex={2} ml="1em">
                    <Paper>
                        <Box p='1em'><Typography variant="h6">密码修改</Typography></Box>
                        <Edit id="profile"
                              basePath="/profile"
                              resource='profile'
                              title={`个人资料`}
                              undoable={false}
                              transform={data => ({...data, id: null, _query: {_type: 'password'}})}
                              {...props}
                        >
                            <SimpleForm toolbar={<EditToolbar/>}>
                                <PasswordInput label={'原密码'} source="oldPassword" validate={userRules.oldPassword}
                                               fullWidth/>
                                <PasswordInput label={'新密码'} source="newPassword" validate={userRules.password}
                                               fullWidth/>
                            </SimpleForm>
                        </Edit>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}
export default Profile;
