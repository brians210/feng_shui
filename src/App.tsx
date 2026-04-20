import { useState } from 'react';
import { Layout, Typography, Card, Tabs } from 'antd';
import { toDate } from 'date-fns-tz';
import { BaziCalculator } from '@aharris02/bazi-calculator-by-alvamind';
import InputForm, { type BirthData } from './components/InputForm';
import BaziChart from './components/BaziChart';
import Interpretations from './components/Interpretations';
import LuckPillars from './components/LuckPillars';
import AnnualPillars from './components/AnnualPillars';
import DetailedPillars from './components/DetailedPillars';
import NobleStars from './components/NobleStars';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const [pillars, setPillars] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [luckPillars, setLuckPillars] = useState<any>(null);
  const [detailedPillars, setDetailedPillars] = useState<any>(null);
  const [annualPillars, setAnnualPillars] = useState<any>(null);
  const [calculator, setCalculator] = useState<any>(null);

  const handleCalculate = (data: BirthData) => {
    try {
      // Convert Dayjs to Date object with timezone
      const dateString = data.date?.format('YYYY-MM-DD');
      const timeString = data.time?.format('HH:mm:ss');
      const dateTimeString = `${dateString}T${timeString}`;

      const birthDate = toDate(dateTimeString, { timeZone: data.timezone });

      // Initialize Bazi Calculator
      const calc = new BaziCalculator(
        birthDate,
        data.gender,
        data.timezone,
        true // birth time is known
      );

      // Get complete analysis
      const completeAnalysis = calc.getCompleteAnalysis();

      // Get annual pillars for current and next 10 years
      const currentYear = new Date().getFullYear();
      const annualPillarsList = [];
      for (let i = -3; i < 10; i++) {
        const pillar = calc.getAnnualPillar(currentYear + i);
        if (pillar) {
          annualPillarsList.push({ year: currentYear + i, pillar });
        }
      }

      // Get timed analysis for current luck pillar
      const timedAnalysis = calc.getTimedAnalysis(new Date(), data.timezone);

      // Update state
      setPillars(completeAnalysis.mainPillars || {});
      setAnalysis(completeAnalysis || {});
      setLuckPillars(completeAnalysis.luckPillars || null);
      setDetailedPillars(completeAnalysis.detailedPillars || null);
      setAnnualPillars({
        pillars: annualPillarsList,
        currentYear: currentYear,
        currentLuckPillar: timedAnalysis?.currentLuckPillar || null,
      });
      setCalculator(calc);

      console.log('Bazi Chart:', calc.toString());
      console.log('Complete Analysis:', completeAnalysis);
      console.log('Timed Analysis:', timedAnalysis);
    } catch (error) {
      console.error('Error calculating Bazi:', error);
      alert('Error calculating your Bazi chart. Please check your input and try again.');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 50px', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={2} style={{ margin: '16px 0' }}>
          八字命理 Bazi Calculator
        </Title>
      </Header>

      <Content style={{ padding: '50px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Card>
            <InputForm onCalculate={handleCalculate} />
          </Card>

          {pillars && analysis && (
            <Tabs
              defaultActiveKey="1"
              style={{ marginTop: '24px' }}
              items={[
                {
                  key: '1',
                  label: '基本分析 Basic',
                  children: (
                    <>
                      <BaziChart pillars={pillars} />
                      <Interpretations analysis={analysis} />
                    </>
                  ),
                },
                {
                  key: '2',
                  label: '大運流年 Fortune',
                  children: (
                    <>
                      {luckPillars && (
                        <LuckPillars
                          pillars={luckPillars.pillars || []}
                          currentLuckPillar={annualPillars?.currentLuckPillar}
                          favorableElements={analysis.basicAnalysis?.favorableElements?.primary || []}
                          unfavorableElements={analysis.basicAnalysis?.favorableElements?.unfavorable || []}
                        />
                      )}
                      {annualPillars && (
                        <AnnualPillars
                          pillars={annualPillars.pillars}
                          currentYearNumber={annualPillars.currentYear}
                          favorableElements={analysis.basicAnalysis?.favorableElements?.primary || []}
                          unfavorableElements={analysis.basicAnalysis?.favorableElements?.unfavorable || []}
                        />
                      )}
                    </>
                  ),
                },
                {
                  key: '3',
                  label: '詳細分析 Details',
                  children: (
                    <>
                      {detailedPillars && <DetailedPillars pillars={detailedPillars} />}
                    </>
                  ),
                },
                {
                  key: '4',
                  label: '神煞五行 Stars',
                  children: (
                    <>
                      {analysis.basicAnalysis && <NobleStars basicAnalysis={analysis.basicAnalysis} />}
                    </>
                  ),
                },
              ]}
            />
          )}
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Bazi Calculator ©{new Date().getFullYear()} | For entertainment and educational purposes
      </Footer>
    </Layout>
  );
}

export default App;
