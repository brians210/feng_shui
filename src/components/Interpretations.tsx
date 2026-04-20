import React from 'react';
import { Card, Descriptions, Tag, Space, Divider } from 'antd';

interface Analysis {
  basicAnalysis?: {
    dayMaster?: {
      stem?: string;
      element?: string;
      yinYang?: string;
    };
    strength?: string;
    favorableElements?: string[];
    unfavorableElements?: string[];
  };
  elementAnalysis?: {
    elements?: {
      [key: string]: number;
    };
  };
}

interface InterpretationsProps {
  analysis: Analysis | null;
}

const Interpretations: React.FC<InterpretationsProps> = ({ analysis }) => {
  if (!analysis || !analysis.basicAnalysis) {
    return null;
  }

  const { dayMaster, dayMasterStrength, favorableElements: favorableElementsResult } = analysis.basicAnalysis;
  const strength = dayMasterStrength?.strength;
  const favorableElements = favorableElementsResult?.primary || [];
  const unfavorableElements = favorableElementsResult?.unfavorable || [];
  const elementCounts = analysis.elementAnalysis?.elements || {};

  // Element name mapping to Chinese
  const elementToChinese: { [key: string]: string } = {
    WOOD: '木',
    FIRE: '火',
    EARTH: '土',
    METAL: '金',
    WATER: '水',
  };

  // Yin Yang mapping to Chinese
  const yinYangToChinese: { [key: string]: string } = {
    Yin: '陰',
    Yang: '陽',
  };

  // Element color mapping
  const elementColors: { [key: string]: string } = {
    WOOD: 'green',
    FIRE: 'red',
    EARTH: 'orange',
    METAL: 'gold',
    WATER: 'blue',
  };

  // Day Master personality traits (simplified v1) - in Chinese
  const getPersonalityTraits = (element?: string) => {
    const traits: { [key: string]: string } = {
      Wood: '創造力強、靈活、成長導向。像樹木一樣，你充滿野心，不斷向上生長。',
      Fire: '熱情、活力充沛、有魅力。像火焰一樣，你帶來溫暖和能量。',
      Earth: '穩定、可靠、善於培育。像大地一樣，你提供根基和支持。',
      Metal: '意志堅強、果斷、有原則。像金屬一樣，你有韌性和結構。',
      Water: '智慧、適應力強、直覺敏銳。像水一樣，你順流而下，找到自己的道路。',
    };
    return traits[element || ''] || '未知元素';
  };

  return (
    <div style={{ marginTop: '24px' }}>
      <h2 style={{ marginBottom: '16px' }}>命理分析</h2>

      {/* Day Master Section */}
      <Card title="日主" style={{ marginBottom: '16px' }}>
        <Space orientation="vertical" style={{ width: '100%' }}>
          <div>
            <strong>天干:</strong>{' '}
            <Tag color={elementColors[dayMaster?.element || '']} style={{ fontSize: '16px' }}>
              {dayMaster?.stem} ({elementToChinese[dayMaster?.element || ''] || dayMaster?.element})
            </Tag>
          </div>
          <div>
            <strong>陰陽:</strong> {yinYangToChinese[dayMaster?.nature || ''] || dayMaster?.nature}
          </div>
          <Divider />
          <div>
            <strong>性格特質:</strong>
            <p style={{ marginTop: '8px', color: '#666' }}>
              {getPersonalityTraits(dayMaster?.element)}
            </p>
          </div>
        </Space>
      </Card>

      {/* Five Elements Balance */}
      <Card title="五行平衡" style={{ marginBottom: '16px' }}>
        <Descriptions column={1} bordered size="small">
          {Object.entries(elementCounts).map(([element, count]) => (
            <Descriptions.Item
              key={element}
              label={
                <span>
                  <Tag color={elementColors[element]}>{elementToChinese[element] || element}</Tag>
                </span>
              }
            >
              {count} 個
            </Descriptions.Item>
          ))}
        </Descriptions>
        {strength && (
          <div style={{ marginTop: '12px' }}>
            <strong>命局強弱:</strong> {strength === 'Strong' ? '強' : strength === 'Weak' ? '弱' : strength === 'Balanced' ? '均衡' : strength}
          </div>
        )}
      </Card>

      {/* Favorable Elements */}
      {favorableElements && favorableElements.length > 0 && (
        <Card title="喜用神" style={{ marginBottom: '16px' }}>
          <Space wrap>
            {favorableElements.map((element) => (
              <Tag key={element} color={elementColors[element]} style={{ fontSize: '14px' }}>
                {elementToChinese[element] || element}
              </Tag>
            ))}
          </Space>
          <p style={{ marginTop: '12px', color: '#666' }}>
            這些元素能增強你的命格。建議通過顏色、方位和活動來增加這些元素的影響。
          </p>
        </Card>
      )}

      {/* Unfavorable Elements */}
      {unfavorableElements && unfavorableElements.length > 0 && (
        <Card title="忌神">
          <Space wrap>
            {unfavorableElements.map((element) => (
              <Tag key={element} color="default" style={{ fontSize: '14px' }}>
                {elementToChinese[element] || element}
              </Tag>
            ))}
          </Space>
          <p style={{ marginTop: '12px', color: '#666' }}>
            這些元素可能會削弱你的命格。應避免過度接觸這些元素。
          </p>
        </Card>
      )}
    </div>
  );
};

export default Interpretations;
