import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Title} from 'react-admin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import {buildUrl} from "./modules/files/utils";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        // height: '500px',
        overflow: 'auto',
    },
});
export default () => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Title title="帮助"/>
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
                        忘记密码可由管理员重置密码为默认密码（123456），管理员忘记密码请联系运维人员；重置密码后，请前往个人资料修改密码。
                    </Box>
                </Typography>
                <Typography variant="h6" color={'textPrimary'}>
                    会话超时：
                </Typography>
                <Typography variant="subtitle1" color={'textSecondary'}>
                    <Box textAlign="justify" m={1}>
                        用户登陆后，如果 7 天内不做任何操作会导致用户登陆失效；另外，如果服务器重新部署升级也会导致用户登陆失效。
                    </Box>
                </Typography>
                <Typography variant="h6" color={'textPrimary'}> 标签： </Typography>
                <List dense={false}>
                    <ListItem>
                        <ListItemText
                            primary='草稿与发布流程'
                            secondary='最初创建标签时，不确定标签的具体信息，通过保存草稿不断完善，最终达到一个可以导出正式使用的标签，此时状态标记为发布，发布后标签信息理论上不允许再修改，目前实际上允许微调，但不支持状态由发布变回草稿。如果需要新的标签，可克隆一条已发布的标签，再次进行上述操作。'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='导入标签'
                            secondary='导入支持 csv 和 xlsx 格式。在右侧下载 CSV 模版文件后，使用 Excel 打开，编辑文件中的内容，保存后通过导入数据功能导入。导入标签时，会去掉内容左右两边的空格；模版列，值为 1 表示 礼盒标签中文模版，值为 2 表示 礼盒标签英文模版。'
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="download" onClick={e => {
                                e.stopPropagation();
                                window.open(buildUrl('template-test.csv'));
                            }}>
                                <GetAppIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                        {/*
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <DownloadTemplateButton/>
                        </IconButton>
                    </ListItemSecondaryAction>
*/}
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='保存草稿'
                            secondary='保存草稿时，字段（除标签种类）都为选填；创建标签时，根据中英文样式会要求输入不同的必填字段，具体规则视页面情况而定。'
                        />
                    </ListItem>
                </List>
                <Typography variant="h6" color={'textPrimary'}> 配置： </Typography>
                <Typography variant="subtitle1" color={'textSecondary'}>
                    <Box textAlign="justify" m={1}>
                        配置内容目前由开发人员维护，不支持新增，如有新增配置的需求，交由开发人员处理。
                        如业务人员有自行新增配置的需求，开发人员可详述配置规则并演示操作，以确保能够熟练使用。
                    </Box>
                </Typography>
                <Typography variant="h6" color={'textPrimary'}>
                    温馨提示：
                </Typography>
                <List dense={false}>
                    <ListItem>
                        <ListItemText
                            primary='必填项说明'
                            secondary='当页面存在多项操作，但每项操作要求的必填项不同，此时只能预先得知它们共同的必填项，其他项是否必填需要实际操作时才能得知'
                        />
                    </ListItem>
                    {/*<ListItem>
                        <ListItemText
                            primary='问题反馈'
                            secondary='如有使用不便，欢迎随时反馈问题，会不断优化更新，保证让您用得省时省力省心'
                        />
                    </ListItem>*/}
                </List>
                <Typography variant="h6" color={'textPrimary'}> 待优化项： </Typography>
                <List dense={false}>
                    <ListItem>
                        <ListItemText
                            primary='标签生成较慢'
                            secondary='标签生成较慢，耗时较长，约为 10 秒钟，请耐心等候。'
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary='预览界面较小'
                            secondary='预览界面较小，导致内容看不清晰，目前自动缩放 150%，但不是居中缩放，仍需要手动滚动到中间'
                        />
                    </ListItem>
                    {/*<ListItem>
                        <ListItemText
                            primary='支持 Excel'
                            secondary='表格名称应为“产品名称+样式名称+序号（或时间戳），需保证标签中含有上述字段的情况下，可按上述规则'
                        />
                    </ListItem>*/}
                </List>
            </CardContent>
        </Card>
    );
};
