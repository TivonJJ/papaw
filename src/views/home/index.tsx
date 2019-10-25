import { Cell, CellGroup, Col, Icon, Row, Dialog } from 'vant';
import { Component, Vue } from 'vue-property-decorator';
import logo from '@/assets/logo.png';
import styles from './style.module.less';

@Component
class Home extends Vue {
    private showSetting = () => {
        Dialog({ title: '设置', message: JSON.stringify(Settings) });
    };

    private showStartParams = () => {
        Dialog({ title: '启动参数', message: JSON.stringify(StartParams) });
    };

    public render() {
        return (
            <div>
                <div class={styles.banner}>
                    <img alt={'logo'} src={logo} class={styles.logo} />
                </div>
                <Row class={styles['user-links']}>
                    <Col span="6" onClick={() => this.$toast('Click:待付款')}>
                        <Icon name="pending-payment" />
                        待付款
                    </Col>
                    <Col span="6" onClick={() => this.$toast('Click:待接单')}>
                        <Icon name="records" />
                        待接单
                    </Col>
                    <Col span="6" onClick={() => this.$toast('Click:待发货')}>
                        <Icon name="tosend" />
                        待发货
                    </Col>
                    <Col span="6" onClick={() => this.$toast('Click:已发货')}>
                        <Icon name="logistics" />
                        已发货
                    </Col>
                </Row>

                <CellGroup class={styles['user-group']}>
                    <Cell>
                        <div class={styles.desc}>
                            papaw是一个基于VUE+Vant的前端脚手架，开发语言使用Typescript，构建环境使用vue-cli，并增加pwa、环境配置、本地能力模拟等功能
                        </div>
                    </Cell>
                </CellGroup>

                <CellGroup>
                    <Cell icon="apps-o" title="组件示例" is-link to="demo" />
                    <Cell icon="user-o" title="Vuex示例" is-link to="user" />
                    <Cell icon="user-o" title="Vuex示例2" is-link to="model" />
                    <Cell
                        icon="notes-o"
                        title="Form表单示例"
                        is-link
                        to="form"
                    />
                    <Cell
                        icon="setting-o"
                        title="系统配置"
                        label="settings.js的全局配置，内含环境配置"
                        onClick={this.showSetting}
                    />
                    <Cell
                        icon="cluster-o"
                        title="启动参数"
                        label="启动参数，运行时传入的--后的参数"
                        onClick={this.showStartParams}
                    />
                </CellGroup>
            </div>
        );
    }
}

export default Home;
