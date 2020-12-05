import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Title} from 'react-admin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default () => (
    <Card>
        <Title title="系统简介"/>
        <CardContent>
            <Typography variant="h6" color={'textPrimary'}>
                角色说明：
            </Typography>
            <Typography variant="subtitle1" color={'textSecondary'}>
                <Box textAlign="justify" m={1}>
                    系统中角色分为【管理员】和【普通用户】，【管理员】可以操作所有功能，【普通用户】只能操作标签。
                </Box>
            </Typography>

            <Typography variant="h6" color={'textPrimary'}>
                忘记密码：
            </Typography>
            <Typography variant="subtitle1" color={'textSecondary'}>
                <Box textAlign="justify" m={1}>
                    忘记密码可由管理员重置密码为默认密码（123456），管理员忘记密码请联系运维人员；重置密码后，请前往右上角个人资料修改密码。
                </Box>
            </Typography>

            <Typography variant="h6" color={'textPrimary'}>
                温馨提示：
            </Typography>
            <Typography variant="subtitle1" color={'textSecondary'}>
                <Box textAlign="justify" m={1}>
                    标签生成较慢，耗时较长，约为 10 秒钟，请耐心等候。
                </Box>
            </Typography>
        </CardContent>
    </Card>
);
