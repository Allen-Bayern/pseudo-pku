import { Outlet } from "react-router-dom";
import { useState } from 'react';
import { Search, Tabbar } from 'react-vant';
import { InfoO, TodoListO, BullhornO, WapHomeO } from '@react-vant/icons';
import { pkuRed } from '@/global';
import './styles/index.less';

export default () => {
    const [searchValue, setSearchValue] = useState<string>('');

    return (
        <div className="layout">
            <div className="header">
                <Search 
                    shape="round"
                    background={pkuRed}
                    value={searchValue}
                    onChange={setSearchValue}
                    placeholder="请输入"
                />
            </div>
            <div className="slot">
                <Outlet />
            </div>
            <Tabbar activeColor={pkuRed}>
                <Tabbar.Item icon={<InfoO />}>
                    信息服务
                </Tabbar.Item>
                <Tabbar.Item icon={<TodoListO />}>
                    办事大厅
                </Tabbar.Item>
                <Tabbar.Item icon={<BullhornO />}>
                    校内公告
                </Tabbar.Item>
                <Tabbar.Item icon={<WapHomeO />}>
                    我的门户
                </Tabbar.Item>
            </Tabbar>
        </div>
    );
};
