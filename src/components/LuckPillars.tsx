import React from 'react';
import { Card, Timeline, Tag, Divider } from 'antd';

interface LuckPillar {
  number: number;
  heavenlyStem: { character: string; elementType: string };
  earthlyBranch: { character: string; animal: string; elementType: string };
  yearStart: number;
  yearEnd: number;
  ageStart: number;
}

interface LuckPillarsProps {
  pillars: LuckPillar[];
  currentLuckPillar?: LuckPillar | null;
  favorableElements: string[];
  unfavorableElements: string[];
}

const LuckPillars: React.FC<LuckPillarsProps> = ({
  pillars,
  currentLuckPillar,
  favorableElements,
  unfavorableElements
}) => {
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

  // Get current year to highlight current luck pillar
  const currentYear = new Date().getFullYear();

  // Helper function to analyze luck pillar quality
  const analyzeLuckPillar = (pillar: LuckPillar): {
    quality: 'favorable' | 'unfavorable' | 'neutral';
    score: number;
    description: string;
  } => {
    const stemElement = pillar.heavenlyStem.elementType;
    const branchElement = pillar.earthlyBranch.elementType;

    let favorableCount = 0;
    let unfavorableCount = 0;

    // Check if stem element is favorable or unfavorable
    if (favorableElements.includes(stemElement)) favorableCount++;
    if (unfavorableElements.includes(stemElement)) unfavorableCount++;

    // Check if branch element is favorable or unfavorable
    if (favorableElements.includes(branchElement)) favorableCount++;
    if (unfavorableElements.includes(branchElement)) unfavorableCount++;

    // Calculate score (range: -2 to +2)
    const score = favorableCount - unfavorableCount;

    let quality: 'favorable' | 'unfavorable' | 'neutral';
    let description: string;

    if (score >= 2) {
      quality = 'favorable';
      description = '極旺 - 天干地支皆為喜用神';
    } else if (score === 1) {
      quality = 'favorable';
      description = '旺相 - 有喜用神相助';
    } else if (score === -1) {
      quality = 'unfavorable';
      description = '不利 - 有忌神干擾';
    } else if (score <= -2) {
      quality = 'unfavorable';
      description = '極不利 - 天干地支皆為忌神';
    } else {
      quality = 'neutral';
      description = '平穩 - 無明顯吉凶';
    }

    return { quality, score, description };
  };

  return (
    <div style={{ marginTop: '24px' }}>
      <h2 style={{ marginBottom: '16px' }}>Major Fortune Cycles 大運</h2>

      <Card>
        <Timeline
          items={pillars.map((pillar) => {
            const isCurrent = pillar.yearStart <= currentYear && currentYear <= pillar.yearEnd;
            const chinese = `${pillar.heavenlyStem.character}${pillar.earthlyBranch.character}`;
            const analysis = analyzeLuckPillar(pillar);

            // Determine timeline color based on quality
            let timelineColor = 'gray';
            if (isCurrent) {
              timelineColor = 'red';
            } else if (analysis.quality === 'favorable') {
              timelineColor = 'green';
            } else if (analysis.quality === 'unfavorable') {
              timelineColor = 'orange';
            }

            // Determine quality tag
            let qualityTag = null;
            if (analysis.quality === 'favorable') {
              qualityTag = <Tag color="green">🌟 {analysis.description}</Tag>;
            } else if (analysis.quality === 'unfavorable') {
              qualityTag = <Tag color="orange">⚠️ {analysis.description}</Tag>;
            } else {
              qualityTag = <Tag color="default">{analysis.description}</Tag>;
            }

            return {
              color: timelineColor,
              children: (
                <div
                  style={{
                    background: isCurrent ? '#fff7e6' : undefined,
                    border: isCurrent ? '2px solid #ff4d4f' : undefined,
                    borderRadius: isCurrent ? '8px' : undefined,
                    padding: isCurrent ? '10px 14px' : undefined,
                    marginBottom: isCurrent ? '4px' : undefined,
                  }}
                >
                  <div style={{ fontWeight: isCurrent ? 'bold' : 'normal' }}>
                    <span style={{ fontSize: isCurrent ? '26px' : '20px', marginRight: '8px' }}>{chinese}</span>
                    {isCurrent && <Tag color="red">當前大運</Tag>}
                    {qualityTag}
                    <span style={{ marginLeft: '8px' }}>
                      {pillar.yearStart}-{pillar.yearEnd} 年 (Age {pillar.ageStart}-{pillar.ageStart + 9})
                    </span>
                  </div>
                  <div style={{ marginTop: '4px', fontSize: '12px', color: '#666' }}>
                    <Tag color={elementColors[pillar.heavenlyStem.elementType]}>
                      天干: {pillar.heavenlyStem.character} ({elementToChinese[pillar.heavenlyStem.elementType]})
                      {favorableElements.includes(pillar.heavenlyStem.elementType) && ' ✓喜用'}
                      {unfavorableElements.includes(pillar.heavenlyStem.elementType) && ' ✗忌神'}
                    </Tag>
                    <Tag color={elementColors[pillar.earthlyBranch.elementType]}>
                      地支: {pillar.earthlyBranch.character} {animalToChinese[pillar.earthlyBranch.animal] || pillar.earthlyBranch.animal} ({elementToChinese[pillar.earthlyBranch.elementType]})
                      {favorableElements.includes(pillar.earthlyBranch.elementType) && ' ✓喜用'}
                      {unfavorableElements.includes(pillar.earthlyBranch.elementType) && ' ✗忌神'}
                    </Tag>
                  </div>
                </div>
              ),
            };
          })}
        />
      </Card>
    </div>
  );
};

export default LuckPillars;
