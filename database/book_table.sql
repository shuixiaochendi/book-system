-- ================================================
-- 图书管理系统数据库表结构
-- 字段：图书名称、图书编号、创建时间、备注信息
-- ================================================

CREATE DATABASE IF NOT EXISTS book_system;
USE book_system;

-- ================================================
-- 图书表
-- ================================================
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `book_name` VARCHAR(200) NOT NULL COMMENT '图书名称',
    `book_no` VARCHAR(50) NOT NULL COMMENT '图书编号',
    `remarks` VARCHAR(500) DEFAULT NULL COMMENT '备注信息',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_book_no` (`book_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='图书表';

-- ================================================
-- 初始化测试数据（55条，用于分页测试）
-- ================================================
INSERT INTO `book` (`book_name`, `book_no`, `remarks`) VALUES
('Java编程思想', 'BK001', '经典Java书籍'),
('Python入门到实践', 'BK002', 'Python学习教材'),
('数据结构与算法', 'BK003', '计算机基础课程'),
('Spring Boot实战', 'BK004', 'Java Web开发指南'),
('Vue.js权威指南', 'BK005', '前端框架教程'),
('深入理解计算机系统', 'BK006', 'CSAPP经典教材'),
('算法导论', 'BK007', '算法领域经典'),
('Effective Java', 'BK008', 'Java最佳实践'),
('JavaScript高级程序设计', 'BK009', 'JS红宝书'),
('Python网络爬虫', 'BK010', '爬虫技术指南'),
('机器学习实战', 'BK011', 'ML入门书籍'),
('深度学习入门', 'BK012', '深度学习基础'),
('Redis设计与实现', 'BK013', 'Redis技术指南'),
('MySQL高性能', 'BK014', '数据库优化'),
('Redis实战', 'BK015', 'Redis应用实践'),
('计算机网络：自顶向下方法', 'BK016', '网络经典教材'),
('操作系统概念', 'BK017', '操作系统基础'),
('编译原理', 'BK018', '编译技术书籍'),
('设计模式', 'BK019', 'GoF设计模式'),
('重构改善既有代码', 'BK020', '代码重构指南'),
('代码整洁之道', 'BK021', '代码质量提升'),
('程序员自我修养', 'BK022', '职业发展指南'),
('UNIX编程艺术', 'BK023', 'Unix系统编程'),
('Linux高性能服务器', 'BK024', '服务器端编程'),
('Nginx高性能Web服务器', 'BK025', '反向代理服务器'),
('Docker容器技术', 'BK026', '容器化部署'),
('Kubernetes权威指南', 'BK027', 'K8s集群管理'),
('微服务设计', 'BK028', '微服务架构'),
('分布式系统设计', 'BK029', '分布式原理'),
('大规模分布式存储系统', 'BK030', '分布式存储'),
('Hadoop权威指南', 'BK031', '大数据处理'),
('Spark快速大数据分析', 'BK032', 'Spark编程'),
('Kafka权威指南', 'BK033', '消息队列'),
('RabbitMQ实战', 'BK034', '消息中间件'),
('ZooKeeper分布式协调', 'BK035', '分布式一致性'),
('MongoDB权威指南', 'BK036', 'NoSQL数据库'),
('Elasticsearch实战', 'BK037', '搜索引擎'),
('Lucene实战', 'BK038', '全文检索'),
('Git权威指南', 'BK039', '版本控制'),
('Maven实战', 'BK040', '构建工具'),
('Jenkins权威指南', 'BK041', '持续集成'),
('Spring Cloud微服务', 'BK042', '微服务框架'),
('Dubbo分布式服务', 'BK043', 'RPC框架'),
('Netty权威指南', 'BK044', '网络编程框架'),
('Thrift分布式RPC', 'BK045', '跨语言RPC'),
('gRPC与Protobuf', 'BK046', '高性能RPC'),
('响应式编程之道', 'BK047', 'RxJava响应式'),
('函数式编程', 'BK048', '函数式思想'),
('Scala编程', 'BK049', 'JVM语言'),
('Kotlin实战', 'BK050', 'Android首选语言'),
('C++ Primer', 'BK051', 'C++经典教材'),
('C编程原则', 'BK052', 'C语言最佳实践'),
('汇编语言与计算机体系结构', 'BK053', '底层知识'),
('计算机组成与设计', 'BK054', '硬件基础'),
('数据库系统概论', 'BK055', '数据库理论');
