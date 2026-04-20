import React from 'react';
import { Card, Descriptions, Tag, Collapse, Row, Col } from 'antd';

const { Panel } = Collapse;

interface HiddenStem {
  character: string;
  elementType: string;
  tenGod?: { chinese: string; name: string } | null;
}

interface DetailedPillar {
  chinese: string;
  heavenlyStem: {
    character: string;
    name: string;
    elementType: string;
    yinYang: string;
  };
  earthlyBranch: {
    character: string;
    animal: string;
    elementType: string;
    hiddenStems: HiddenStem[];
  };
  heavenlyStemTenGod?: { chinese: string; name: string } | null;
  lifeCycle?: string;
}

interface DetailedPillarsProps {
  pillars: {
    year: DetailedPillar;
    month: DetailedPillar;
    day: DetailedPillar;
    hour: DetailedPillar;
  };
}

const DetailedPillars: React.FC<DetailedPillarsProps> = ({ pillars }) => {
  // Element mapping
  const elementToChinese: { [key: string]: string } = {
    WOOD: '木',
    FIRE: '火',
    EARTH: '土',
    METAL: '金',
    WATER: '水',
  };

  const elementColors: { [key: string]: string } = {
    WOOD: 'green',
    FIRE: 'red',
    EARTH: 'orange',
    METAL: 'gold',
    WATER: 'blue',
  };

  const renderPillarDetails = (pillar: DetailedPillar, title: string, isDayMaster: boolean = false) => {
    return (
      <Panel
        header={
          <span>
            <strong style={{ fontSize: '16px' }}>
              {title} {pillar.chinese} {isDayMaster && '⭐'}
            </strong>
          </span>
        }
        key={title}
      >
        <Descriptions column={1} size="small" bordered>
          <Descriptions.Item label="天干 Heavenly Stem">
            <Tag color={elementColors[pillar.heavenlyStem.elementType]}>
              {pillar.heavenlyStem.character} - {pillar.heavenlyStem.name}
            </Tag>
            <Tag>{pillar.heavenlyStem.yinYang}</Tag>
            {pillar.heavenlyStemTenGod && (
              <Tag color="purple">{pillar.heavenlyStemTenGod.chinese}</Tag>
            )}
          </Descriptions.Item>

          <Descriptions.Item label="地支 Earthly Branch">
            <Tag color={elementColors[pillar.earthlyBranch.elementType]}>
              {pillar.earthlyBranch.character} - {pillar.earthlyBranch.animal}
            </Tag>
          </Descriptions.Item>

          {pillar.lifeCycle && (
            <Descriptions.Item label="十二長生 Life Cycle">
              {pillar.lifeCycle}
            </Descriptions.Item>
          )}

          <Descriptions.Item label="藏干 Hidden Stems">
            <div>
              {pillar.earthlyBranch.hiddenStems.map((stem, index) => (
                <div key={index} style={{ marginBottom: '4px' }}>
                  <Tag color={elementColors[stem.elementType]} size="small">
                    {stem.character} ({elementToChinese[stem.elementType]})
                  </Tag>
                  {stem.tenGod && (
                    <Tag color="purple" size="small">
                      {stem.tenGod.chinese}
                    </Tag>
                  )}
                </div>
              ))}
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Panel>
    );
  };

  return (
    <div style={{ marginTop: '24px' }}>
      <h2 style={{ marginBottom: '16px' }}>Detailed Analysis 詳細分析</h2>

      <Card>
        <Collapse defaultActiveKey={['日柱 Day']}>
          {renderPillarDetails(pillars.year, '年柱 Year', false)}
          {renderPillarDetails(pillars.month, '月柱 Month', false)}
          {renderPillarDetails(pillars.day, '日柱 Day', true)}
          {renderPillarDetails(pillars.hour, '時柱 Hour', false)}
        </Collapse>
      </Card>
    </div>
  );
};

export default DetailedPillars;
