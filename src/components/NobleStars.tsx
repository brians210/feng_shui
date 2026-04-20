import React from 'react';
import { Card, Row, Col, Descriptions, Tag } from 'antd';

interface NobleStarsProps {
  basicAnalysis: {
    nobleman?: string[];
    intelligence?: string;
    skyHorse?: string;
    peachBlossom?: string;
    lifeGua?: number;
    eightMansions?: {
      group: string;
      lucky: {
        wealth: string;
        health: string;
        romance: string;
        career: string;
      };
      unlucky: {
        obstacles: string;
        quarrels: string;
        setbacks: string;
        totalLoss: string;
      };
    };
    fiveFactors?: {
      WOOD?: number;
      FIRE?: number;
      EARTH?: number;
      METAL?: number;
      WATER?: number;
    };
  };
}

const NobleStars: React.FC<NobleStarsProps> = ({ basicAnalysis }) => {
  const { nobleman, intelligence, skyHorse, peachBlossom, eightMansions, fiveFactors, lifeGua } = basicAnalysis;

  return (
    <div style={{ marginTop: '24px' }}>
      <h2 style={{ marginBottom: '16px' }}>Special Stars & Elements 神煞與五行</h2>

      <Row gutter={[16, 16]}>
        {/* Noble Stars */}
        <Col xs={24} md={12}>
          <Card title="神煞 Special Stars" size="small">
            <Descriptions column={1} size="small">
              {nobleman && nobleman.length > 0 && (
                <Descriptions.Item label="天乙貴人 Nobleman">
                  {nobleman.map((star, i) => (
                    <Tag key={i} color="gold">{star}</Tag>
                  ))}
                </Descriptions.Item>
              )}
              {intelligence && (
                <Descriptions.Item label="文昌 Intelligence">
                  <Tag color="blue">{intelligence}</Tag>
                </Descriptions.Item>
              )}
              {skyHorse && (
                <Descriptions.Item label="驛馬 Sky Horse">
                  <Tag color="green">{skyHorse}</Tag>
                </Descriptions.Item>
              )}
              {peachBlossom && (
                <Descriptions.Item label="桃花 Peach Blossom">
                  <Tag color="pink">{peachBlossom}</Tag>
                </Descriptions.Item>
              )}
              {lifeGua && (
                <Descriptions.Item label="命卦 Life Gua">
                  <Tag color="purple">{lifeGua}</Tag>
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        </Col>

        {/* Five Elements Percentage */}
        <Col xs={24} md={12}>
          <Card title="五行分佈 Five Elements Distribution" size="small">
            <Descriptions column={1} size="small">
              {fiveFactors && Object.entries(fiveFactors).map(([element, percentage]) => {
                const elementChinese: { [key: string]: string } = {
                  WOOD: '木',
                  FIRE: '火',
                  EARTH: '土',
                  METAL: '金',
                  WATER: '水',
                };
                const colors: { [key: string]: string } = {
                  WOOD: 'green',
                  FIRE: 'red',
                  EARTH: 'orange',
                  METAL: 'gold',
                  WATER: 'blue',
                };

                return (
                  <Descriptions.Item key={element} label={elementChinese[element]}>
                    <Tag color={colors[element]}>{percentage}%</Tag>
                    <div style={{ width: '100%', backgroundColor: '#f0f0f0', height: '8px', marginTop: '4px', borderRadius: '4px' }}>
                      <div
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: colors[element],
                          height: '100%',
                          borderRadius: '4px',
                        }}
                      />
                    </div>
                  </Descriptions.Item>
                );
              })}
            </Descriptions>
          </Card>
        </Col>

        {/* Eight Mansions */}
        {eightMansions && (
          <Col xs={24}>
            <Card title={`八宅風水 Eight Mansions (${eightMansions.group} Group)`} size="small">
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <div style={{ marginBottom: '12px' }}>
                    <strong>吉方 Lucky Directions:</strong>
                  </div>
                  <Descriptions column={1} size="small" bordered>
                    <Descriptions.Item label="財位 Wealth">
                      <Tag color="green">{eightMansions.lucky.wealth}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="健康 Health">
                      <Tag color="green">{eightMansions.lucky.health}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="桃花 Romance">
                      <Tag color="green">{eightMansions.lucky.romance}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="事業 Career">
                      <Tag color="green">{eightMansions.lucky.career}</Tag>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>

                <Col xs={24} md={12}>
                  <div style={{ marginBottom: '12px' }}>
                    <strong>凶方 Unlucky Directions:</strong>
                  </div>
                  <Descriptions column={1} size="small" bordered>
                    <Descriptions.Item label="阻礙 Obstacles">
                      <Tag color="red">{eightMansions.unlucky.obstacles}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="爭吵 Quarrels">
                      <Tag color="red">{eightMansions.unlucky.quarrels}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="挫折 Setbacks">
                      <Tag color="red">{eightMansions.unlucky.setbacks}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="絕命 Total Loss">
                      <Tag color="red">{eightMansions.unlucky.totalLoss}</Tag>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default NobleStars;
