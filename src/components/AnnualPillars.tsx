import React from 'react';
import { Card, Row, Col, Tag } from 'antd';

interface Pillar {
  chinese: string;
  heavenlyStem: { character: string; elementType: string; name: string };
  earthlyBranch: { character: string; animal: string; elementType: string };
  ganZhi?: { name: string; elementName: string };
}

interface AnnualPillarData {
  year: number;
  pillar: Pillar;
}

interface AnnualPillarsProps {
  pillars: AnnualPillarData[];
  currentYearNumber: number;
  favorableElements: string[];
  unfavorableElements: string[];
}

const AnnualPillars: React.FC<AnnualPillarsProps> = ({ pillars, currentYearNumber, favorableElements, unfavorableElements }) => {
  // Element mapping
  const elementToChinese: { [key: string]: string } = {
    WOOD: '木',
    FIRE: '火',
    EARTH: '土',
    METAL: '金',
    WATER: '水',
  };

  const animalToChinese: { [key: string]: string } = {
    Rat: '鼠', Ox: '牛', Tiger: '虎', Rabbit: '兔',
    Dragon: '龍', Snake: '蛇', Horse: '馬', Goat: '羊',
    Monkey: '猴', Rooster: '雞', Dog: '狗', Pig: '豬',
  };

  const elementColors: { [key: string]: string } = {
    WOOD: 'green',
    FIRE: 'red',
    EARTH: 'orange',
    METAL: 'gold',
    WATER: 'blue',
  };

  const analyzeYear = (pillar: Pillar): { quality: 'favorable' | 'unfavorable' | 'neutral'; label: string; color: string } => {
    const stemEl = pillar.heavenlyStem.elementType;
    const branchEl = pillar.earthlyBranch.elementType;
    let score = 0;
    if (favorableElements.includes(stemEl)) score++;
    if (unfavorableElements.includes(stemEl)) score--;
    if (favorableElements.includes(branchEl)) score++;
    if (unfavorableElements.includes(branchEl)) score--;

    if (score >= 2) return { quality: 'favorable', label: '極旺', color: 'green' };
    if (score === 1) return { quality: 'favorable', label: '旺相', color: 'green' };
    if (score === -1) return { quality: 'unfavorable', label: '不利', color: 'orange' };
    if (score <= -2) return { quality: 'unfavorable', label: '極不利', color: 'red' };
    return { quality: 'neutral', label: '平穩', color: 'default' };
  };

  const renderPillar = (pillarData: AnnualPillarData) => {
    const { year, pillar } = pillarData;
    const stem = pillar.heavenlyStem.character;
    const branch = pillar.earthlyBranch.character;
    const isCurrentYear = year === currentYearNumber;
    const yearAnalysis = analyzeYear(pillar);

    return (
      <Col xs={24} sm={12} md={8} lg={6} key={year}>
        <Card
          size="small"
          title={
            <div>
              {year}年 {isCurrentYear && <Tag color="red">今年</Tag>}
              <Tag color={yearAnalysis.color} style={{ marginLeft: '4px' }}>{yearAnalysis.label}</Tag>
            </div>
          }
          style={{
            border: isCurrentYear ? '2px solid #ff4d4f' : undefined,
            boxShadow: isCurrentYear ? '0 0 10px rgba(255,77,79,0.3)' : undefined
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', marginBottom: '12px', fontWeight: 'bold' }}>
              {stem}{branch}
            </div>
            <div style={{ marginBottom: '8px' }}>
              <Tag color={elementColors[pillar.heavenlyStem.elementType]} style={{ fontSize: '11px' }}>
                天干: {stem} ({elementToChinese[pillar.heavenlyStem.elementType]})
              </Tag>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <Tag color={elementColors[pillar.earthlyBranch.elementType]} style={{ fontSize: '11px' }}>
                地支: {branch} {animalToChinese[pillar.earthlyBranch.animal] || pillar.earthlyBranch.animal} ({elementToChinese[pillar.earthlyBranch.elementType]})
              </Tag>
            </div>
            {pillar.ganZhi && (
              <div style={{ fontSize: '11px', color: '#666' }}>
                納音: {pillar.ganZhi.name}
              </div>
            )}
          </div>
        </Card>
      </Col>
    );
  };

  return (
    <div style={{ marginTop: '24px' }}>
      <h2 style={{ marginBottom: '16px' }}>Annual Pillars 流年 (未來10年)</h2>
      <Row gutter={[16, 16]}>
        {pillars.map(pillarData => renderPillar(pillarData))}
      </Row>
    </div>
  );
};

export default AnnualPillars;
