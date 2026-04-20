import React from 'react';
import { Row, Col, Card, Tag } from 'antd';

interface Pillar {
  chinese?: string;
  element?: string;
  animal?: string;
  stem?: string;
  branch?: { element?: string };
}

interface BaziChartProps {
  pillars: {
    year?: Pillar;
    month?: Pillar;
    day?: Pillar;
    time?: Pillar;
  };
}

const BaziChart: React.FC<BaziChartProps> = ({ pillars }) => {
  // Element name mapping to Chinese
  const elementToChinese: { [key: string]: string } = {
    WOOD: '木',
    FIRE: '火',
    EARTH: '土',
    METAL: '金',
    WATER: '水',
  };

  const renderPillar = (pillar: Pillar | undefined, title: string, isDayMaster = false) => {
    if (!pillar) return null;

    // Split the chinese characters (format: 甲子 = stem + branch)
    const chinese = pillar.chinese || '';
    const stem = chinese.charAt(0);
    const branch = chinese.charAt(1);

    return (
      <Col xs={24} sm={12} md={6}>
        <Card
          size="small"
          title={
            <div style={{ textAlign: 'center' }}>
              {title} {isDayMaster && '⭐'}
            </div>
          }
          style={{ height: '100%' }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>
              {stem}
            </div>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>
              {branch}
            </div>
            {pillar.element && (
              <Tag color="blue" style={{ marginTop: '8px' }}>
                {elementToChinese[pillar.element] || pillar.element}
              </Tag>
            )}
            {pillar.branch?.element && pillar.branch.element !== pillar.element && (
              <Tag color="green" style={{ marginTop: '8px' }}>
                {elementToChinese[pillar.branch.element] || pillar.branch.element}
              </Tag>
            )}
          </div>
        </Card>
      </Col>
    );
  };

  return (
    <div style={{ marginTop: '24px' }}>
      <h2 style={{ marginBottom: '16px' }}>四柱八字</h2>
      <Row gutter={[16, 16]}>
        {renderPillar(pillars.year, '年柱')}
        {renderPillar(pillars.month, '月柱')}
        {renderPillar(pillars.day, '日柱', true)}
        {renderPillar(pillars.time, '時柱')}
      </Row>
    </div>
  );
};

export default BaziChart;
