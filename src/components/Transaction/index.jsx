import React, { useState, useMemo } from 'react';
import { GlobalStyle, AppWrapper, Main, PageHeader, PageTitle, PageSub, AddButton, Toolbar, SearchBox, SearchInput, TabGroup, Tab, TransactionList, TransactionRow, TxIcon, TxInfo, TxName, TxMeta, TxDot, TxAmount, TxActions, IconBtn,} from './style';
import { Icons } from '../registration/singIN/style';

const INITIAL_DATA = [
  { id: 1,  name: 'Supermarket', category: 'Ovqat',    date: '2026-05-15', amount: 45000,    type: 'expense' },
  { id: 2,  name: 'Ish haqi',    category: 'Daromad',  date: '2026-05-14', amount: 5000000,  type: 'income'  },
  { id: 3,  name: 'Transport',   category: 'Transport', date: '2026-05-14', amount: 25000,    type: 'expense' },
  { id: 4,  name: 'Kafe',        category: 'Ovqat',    date: '2026-05-13', amount: 60000,    type: 'expense' },
  { id: 5,  name: 'Kommunal',    category: "To'lovlar", date: '2026-05-12', amount: 350000,   type: 'expense' },
];




const formatAmount = (n) =>
  n.toLocaleString('uz-UZ').replace(/,/g, ' ') + " so'm";

export default function Transactions() {
  const [transactions, setTransactions] = useState(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [activeNav, setActiveNav] = useState('transactions');
  const [editTarget, setEditTarget] = useState(null);



  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchTab =
        activeTab === 'all' ||
        (activeTab === 'income'  && tx.type === 'income') ||
        (activeTab === 'expense' && tx.type === 'expense');
      const matchSearch =
        tx.name.toLowerCase().includes(search.toLowerCase()) ||
        tx.category.toLowerCase().includes(search.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [transactions, activeTab, search]);


 


  const handleSubmit = () => {
    if (!form.name || !form.amount) return;
    const payload = {
      name:     form.name,
      amount:   Number(form.amount),
      category: form.category,
      date:     form.date || new Date().toISOString().slice(0, 10),
      type:     form.type,
    };

    if (editTarget) {
      setTransactions((prev) =>
        prev.map((tx) => (tx.id === editTarget.id ? { ...tx, ...payload } : tx))
      );
    } else {
      setTransactions((prev) => [
        { id: Date.now(), ...payload },
        ...prev,
      ]);
    }
    closeModal();
  };

  const handleDelete = (id) =>
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Main>
          <PageHeader>
            <div>
              <PageTitle>Tranzaksiyalar</PageTitle>
              <PageSub>Barcha xarajat va daromadlar</PageSub>
            </div>
            <AddButton>
             <Icons.PlusIcon/>
              Yangi tranzaksiya
            </AddButton>
          </PageHeader>

          <Toolbar>
            <SearchBox>
              <Icons.SearchIcon/>
              <SearchInput
                placeholder="Qidirish..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchBox>

            <TabGroup>
              <Tab $active={activeTab === 'all'}     onClick={() => setActiveTab('all')}>Barchasi</Tab>
              <Tab $active={activeTab === 'income'}  onClick={() => setActiveTab('income')}>Daromad</Tab>
              <Tab $active={activeTab === 'expense'} onClick={() => setActiveTab('expense')}>Xarajat</Tab>
            </TabGroup>
          </Toolbar>

          
          <TransactionList>
            {filtered.map((tx, i) => (
              <TransactionRow key={tx.id} $index={i}>
                <TxIcon $income={tx.type === 'income'}>
                  {tx.type === 'income'
                    ? <Icons.GreenbottomIcon />
                    : <Icons.RedRightIcon />
                  }
                </TxIcon>

                <TxInfo>
                  <TxName>{tx.name}</TxName>
                  <TxMeta>
                    {tx.category}
                    <TxDot />
                    <Icons.DateIcon style={{width: "12px", height: "12px"}}/>
                    {tx.date}
                  </TxMeta>
                </TxInfo>

                <TxAmount $income={tx.type === 'income'}>
                  {tx.type === 'income' ? '+' : '-'}{formatAmount(tx.amount)}
                </TxAmount>

                <TxActions>
                  <IconBtn title="Tahrirlash">
                    <Icons.EditIcon/>
                  </IconBtn>
                  <IconBtn $danger onClick={() => handleDelete(tx.id)} title="O'chirish">
                   <Icons.DeleteIcon/>
                  </IconBtn>
                </TxActions>
              </TransactionRow>
            ))}

            {filtered.length === 0 && (
              <TransactionRow $index={0} style={{ justifyContent: 'center', color: '#bbb', padding: '32px' }}>
                Tranzaksiyalar topilmadi
              </TransactionRow>
            )}
          </TransactionList>
        </Main>
      </AppWrapper>
    </>
  );
}