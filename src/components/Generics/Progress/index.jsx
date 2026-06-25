// import { CategoryAmount, CategoryHeader, CategoryItem, CategoryName, FillBar, TrackBar, Wrapper } from "./style";

// const CATEGORIES = [
//      { name: 'Ovqat', amount: 850000, color: '#2563eb', percent: 30 },
//      { name: 'Transport', amount: 420000, color: '#16a34a', percent: 17 },
//      { name: "To'lovlar", amount: 650000, color: '#ea580c', percent: 25 },
//      { name: "O'yin-kulgi", amount: 320000, color: '#9333ea', percent: 13 },
// ];

// const formatAmount = (n) =>
//      n.toLocaleString('uz-UZ').replace(/,/g, ' ') + " so'm";

// const GenericProgress = ({ categories = CATEGORIES }) => (
//      <Wrapper>
//           <br />
//           {categories.map(({ name, amount, color, percent }, i) => (
//                <CategoryItem key={name}>
//                     <CategoryHeader>
//                          <CategoryName>{name}</CategoryName>
//                          <CategoryAmount>{formatAmount(amount)}</CategoryAmount>
//                     </CategoryHeader>
//                     <TrackBar>
//                          <FillBar $color={color} $percent={percent} $delay={i * 0.1} />
//                     </TrackBar>
//                </CategoryItem>
//           ))}
//      </Wrapper>
// );

// export default GenericProgress;

import React from 'react';
import { Flex, Progress, Typography } from 'antd';

const { Text } = Typography;

const CATEGORIES = [
     { name: 'Ovqat', amount: "850,000 so'm", color: '#2563eb', percent: 30 },
     { name: 'Transport', amount: "420,000 so'm", color: '#16a34a', percent: 17 },
     { name: "To'lovlar", amount: "650,000 so'm", color: '#ea580c', percent: 25 },
     { name: "O'yin-kulgi", amount: "320,000 so'm", color: '#9333ea', percent: 13 },
];

const GenericProgress = () => (
     <Flex gap={16} vertical style={{ marginTop: "20px" }}>
          {CATEGORIES.map(({ name, amount, color, percent }) => (
               <div key={name}>
                    <Flex justify="space-between" style={{ marginBottom: "2px" }}>
                         <Text style={{ fontSize: 14, fontWeight: "500", color: '#1a1a1a' }}>
                              {name}
                         </Text>
                         <Text style={{ fontSize: 14, color: '#0A0A0A', fontWeight: "600" }}>
                              {amount}
                         </Text>
                    </Flex>
                    <Progress percent={percent} strokeColor={color} trailColor="#efefef" showInfo={false} strokeLinecap="round" size={['100%', 8]} />
               </div>
          ))}
     </Flex>
);

export default GenericProgress;