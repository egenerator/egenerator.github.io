```mermaid

flowchart LR;
    呼叫服务-.->接受服务
    显示服务商地点-.-服务商
    展示-.->展示设备信息
    用户管理-.->展示个人信息
    余额-.->展示个人信息
    余额-.-佣金
    设备管理-.-授权
    服务商管理-.->展示服务商信息

    支付-.->设备购买
    支付-.->租赁
    支付-.->会员

    subgraph "结算"
        余额
        支付
        提现
    end
    subgraph 客户端
        展示个人信息
        展示设备信息
        subgraph 推荐
            佣金
        end
        subgraph "商城"
            subgraph "设备购买"
            end
            subgraph "租赁"
            end
            会员
        end
        subgraph 服务
            显示服务商地点
            呼叫服务
        end
    end
    
    subgraph 后端
        subgraph "用户管理"
        direction RL
            subgraph "个人信息"
            end
            subgraph "车辆信息"
            end
            subgraph "拥有设备"
            end
        end
        subgraph 设备管理
        end
        subgraph 服务商管理
        end
    end

    subgraph 设备端
        subgraph 设备远程接口
            展示
            授权
        end
    end


    subgraph "服务商"
        subgraph "接受服务"
        end
        展示服务商信息
    end

```
