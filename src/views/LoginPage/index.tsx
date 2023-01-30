/**
 * @author yueb
 * @description 仿登录页
 */

import { useState } from 'react';
import { 
    Button, 
    Checkbox,
    Form,
    Input, 
    Tabs, 
} from 'react-vant';
import { 
    pkuLogo, 
    pkuRed,
    pkuWest,
    qrCodeImage
} from '@/global';
import './styles/LoginPage.less';

const tabItems = ['账号登录', '扫码登录'];

const { TabPane } = Tabs;
const { Item: FormItem } = Form;

export default () => {
    const [ loginForm ] = Form.useForm<UserInfoLogin>();
    const [ isRemembered, setIsRemembered ] = useState<boolean>(false);

    function handleForgetPassword(): void {
        window.open(
            'https://iaaa.pku.edu.cn/iaaa/resources/help/findPwd.html',
            '_blank'
        );
    }

    const footerButton = (
        <div className="confirm-bottom">
            <div className="remember-and-forget">
                <Checkbox
                    shape='square'
                    iconSize='12px'
                    checked={isRemembered}
                    onChange={setIsRemembered}
                >
                    记住账号
                </Checkbox>
                <p 
                    className="forget"
                    onClick={handleForgetPassword}
                >
                    忘记密码?
                </p>
            </div>
            <Button
                className='login-button'
                color={pkuRed}
                nativeType='submit'
            >
                登录
            </Button>
        </div>
    );

    function handleLogin(values: UserInfoLogin): void {
        console.log(values);
    }

    return (
        <div className="login-page">
            <div className="pku-logo">
                <a href='https://www.pku.edu.cn' className='pku-link'>
                    <img 
                        src={pkuLogo}
                        alt="北大" 
                        className='pku-logo-img'
                    />
                </a>
            </div>
            <Tabs
                className='login-tab'
                color={pkuRed}
                defaultActive={ tabItems[0] }
                titleInactiveColor='#000'
            >
                <TabPane
                    title={tabItems[0]}
                    titleClass='pane-title'
                >
                    <Form
                        form={loginForm}
                        footer={footerButton}
                        onFinish={handleLogin}
                    >
                        <FormItem
                            name='username'
                            label='账号'
                            rules={
                                [
                                    {
                                        required: true, 
                                        message: '账号不能为空' 
                                    },
                                ]
                            }
                        >
                            <Input 
                                clearable={true}
                                placeholder='学号/职工号/北大邮箱/手机号'
                            />
                        </FormItem>
                        <FormItem
                            name='password'
                            label='密码'
                            rules={
                                [
                                    {
                                        required: true, 
                                        message: '密码不能为空' 
                                    },
                                ]
                            }
                        >
                            <Input 
                                clearable={true}
                                placeholder='密码'
                                type='password'
                            />
                        </FormItem>
                    </Form>
                </TabPane>
                <TabPane
                    title={tabItems[1]}
                    titleClass='pane-title'
                >
                    <div className="qr-code">
                        <p className="qr-code-tip">
                            使用<span className='pku-app'>"北京大学"APP</span>扫码进入
                        </p>
                        <img 
                            src={qrCodeImage} 
                            alt="二维码图片" 
                            className="qr-code-image" 
                        />
                    </div>
                </TabPane>
            </Tabs>
            <div className="pku-scene">
                <img 
                    src={pkuWest}
                    alt="北大西门" 
                    className="pku-scene-image" 
                />
            </div>
            <div className="bottom">
                <p className="bottom-info tel">服务热线: 010-12345678</p>
                <p className="bottom-info email">Email: donot@tell.you</p>
            </div>
        </div>
    );
};
