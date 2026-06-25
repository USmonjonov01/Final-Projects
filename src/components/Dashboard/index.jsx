import GenericProgress from "../Generics/Progress";
import { Icons } from "../registration/singIN/style";
import { Wrapper, Header, HeaderLeft, HeaderRight, Title, Subtitle, CardsGrid, StatCard, CardLabel, CardValue, CardSubText, ContentGrid, TransactionsCard, CategoriesCard, SectionHeader, TransactionsList, TransactionItem, TransactionIcon, TransactionInfo, TransactionTitle, TransactionCategory, TransactionAmount, TransactionDate, CategoryList, CategoryItem, CategoryTop, ProgressWrapper, ProgressBar, CardTop, } from "./style";



const Dashboard = () => {
     return <Wrapper>
          <Header>
               <HeaderLeft>
                    <Title>Dashboard</Title>
                    <Subtitle>Xarajatlaringizni boshqaring</Subtitle>
               </HeaderLeft>

               <HeaderRight>
                    <Icons.DateIcon />
                    <span>May 2026</span>
               </HeaderRight>
          </Header>

          <CardsGrid>
               <StatCard>
                    <CardTop>
                         <CardLabel>Balans</CardLabel>
                         <Icons.smallWalletIcon />
                    </CardTop>
                    <CardValue>2,760,000 so'm</CardValue>
                    <CardSubText>Umumiy balans</CardSubText>
               </StatCard>

               <StatCard>
                    <CardTop>
                         <CardLabel>Daromad</CardLabel>
                         <Icons.topGreenIcon />
                    </CardTop>
                    <CardValue className="income">
                         5,000,000 so'm
                    </CardValue>
                    <CardSubText>Ushbu oy</CardSubText>
               </StatCard>

               <StatCard>
                    <CardTop>
                         <CardLabel>Xarajat</CardLabel>
                         <Icons.bottomRedIcon />
                    </CardTop>
                    <CardValue className="expense">
                         2,240,000 so'm
                    </CardValue>
                    <CardSubText>Ushbu oy</CardSubText>
               </StatCard>
          </CardsGrid>

          <ContentGrid>
               <TransactionsCard>
                    <SectionHeader>
                         <h3>So'nggi tranzaksiyalar</h3>

                         <button>
                              Barchasini ko'rish
                         </button>
                    </SectionHeader>

                    <TransactionsList>
                         <TransactionItem>
                              <TransactionIcon className="expense">
                                   <Icons.RedRightIcon />
                              </TransactionIcon>

                              <TransactionInfo>
                                   <TransactionTitle>Supermarket</TransactionTitle>
                                   <TransactionCategory>Ovqat</TransactionCategory>
                              </TransactionInfo>

                              <div>
                                   <TransactionAmount className="expense">
                                        -45,000 so'm
                                   </TransactionAmount>
                                   <TransactionDate>2026-05-15</TransactionDate>
                              </div>
                         </TransactionItem>

                         <TransactionItem>
                              <TransactionIcon className="income">
                                   <Icons.GreenbottomIcon />
                              </TransactionIcon>

                              <TransactionInfo>
                                   <TransactionTitle>Ish haqi</TransactionTitle>
                                   <TransactionCategory>Daromad</TransactionCategory>
                              </TransactionInfo>

                              <div>
                                   <TransactionAmount className="income">
                                        +5,000,000 so'm
                                   </TransactionAmount>
                                   <TransactionDate>2026-05-14</TransactionDate>
                              </div>
                         </TransactionItem>

                         <TransactionItem>
                              <TransactionIcon className="expense">
                                   <Icons.RedRightIcon />
                              </TransactionIcon>

                              <TransactionInfo>
                                   <TransactionTitle>Transport</TransactionTitle>
                                   <TransactionCategory>Transport</TransactionCategory>
                              </TransactionInfo>

                              <div>
                                   <TransactionAmount className="expense">
                                        -25,000 so'm
                                   </TransactionAmount>
                                   <TransactionDate>2026-05-14</TransactionDate>
                              </div>
                         </TransactionItem>

                         <TransactionItem>
                              <TransactionIcon className="expense">
                                   <Icons.RedRightIcon />
                              </TransactionIcon>

                              <TransactionInfo>
                                   <TransactionTitle>Kafe</TransactionTitle>
                                   <TransactionCategory>Ovqat</TransactionCategory>
                              </TransactionInfo>

                              <div>
                                   <TransactionAmount className="expense">
                                        -60,000 so'm
                                   </TransactionAmount>
                                   <TransactionDate>2026-05-13</TransactionDate>
                              </div>
                         </TransactionItem>
                    </TransactionsList>
               </TransactionsCard>

               <CategoriesCard>
                    <SectionHeader>
                         <h3>Kategoriyalar bo'yicha</h3>
                    </SectionHeader>

                    <GenericProgress  />

                    {/* <CategoryList>
                         <CategoryItem>
                              <CategoryTop>
                                   <span>Ovqat</span>
                                   <span>850,000 so'm</span>
                              </CategoryTop>

                              <ProgressWrapper>
                                   <ProgressBar width="38%" color="#3B82F6" />
                              </ProgressWrapper>
                         </CategoryItem>

                         <CategoryItem>
                              <CategoryTop>
                                   <span>Transport</span>
                                   <span>420,000 so'm</span>
                              </CategoryTop>

                              <ProgressWrapper>
                                   <ProgressBar width="20%" color="#22C55E" />
                              </ProgressWrapper>
                         </CategoryItem>

                         <CategoryItem>
                              <CategoryTop>
                                   <span>To'lovlar</span>
                                   <span>650,000 so'm</span>
                              </CategoryTop>

                              <ProgressWrapper>
                                   <ProgressBar width="32%" color="#F97316" />
                              </ProgressWrapper>
                         </CategoryItem>

                         <CategoryItem>
                              <CategoryTop>
                                   <span>O'yin-kulgi</span>
                                   <span>320,000 so'm</span>
                              </CategoryTop>

                              <ProgressWrapper>
                                   <ProgressBar width="15%" color="#A855F7" />
                              </ProgressWrapper>
                         </CategoryItem>
                    </CategoryList> */}
               </CategoriesCard>
          </ContentGrid>
     </Wrapper>
};

export default Dashboard;