import React, { useState } from 'react';
import {
  Container,
  Accordion,
  Message,
  Form,
  Icon,
  Header,
  Label,
} from 'semantic-ui-react';
import { Table } from 'antd';
import styled from 'styled-components';

import NoticeArticles from '../../constants/NoticeArticles';

import { getStoresByAddr } from '../../api/NiaApi';
import StoreType from '../../constants/store/StoreType';
import RemainStat from '../../constants/store/RemainStat';

const ComponentWrapper = styled.div`
  margin: 2rem auto;
`;

const MessageWrapper = styled.div`
  margin: 2rem auto;
`;

const SearchWrapper = styled(Form)`
  text-align: center;
`;

const SearchInputWrapper = styled.div`
  margin: 2rem auto;
  width: 100%;
`;

const ResultWrapper = styled.div`
  margin: 2rem auto;
`;

const ResultHeaderWrapper = styled.div`
  margin: 2rem;
  text-align: center;
`;

const TableWrapper = styled.div`
  margin: 1rem 0.5rem;
`;

const StoreList = () => {
  const [activeNotice, setActiveNotice] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loading, isLoading] = useState(false);
  const [result, setResult] = useState(null);

  const tableColumns = [
    {
      title: '고유번호',
      dataIndex: 'code',
      sorter: (a, b) => {
        const aValue = a.code;
        const bValue = b.code;
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '유형',
      index: 'type',
      render: (record) => {
        const typeName = StoreType[record.type];
        return typeName;
      },
      sorter: (a, b) => {
        const aValue = a.type;
        const bValue = b.type;
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '이름',
      dataIndex: 'name',
      sorter: (a, b) => {
        const aValue = a.name;
        const bValue = b.name;
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '주소',
      dataIndex: 'addr',
      sorter: (a, b) => {
        const aValue = a.addr;
        const bValue = b.addr;
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '재고',
      render: (record) => {
        const { remain_stat: remianStatKey } = record;
        const { title, color } = RemainStat[remianStatKey];
        if (color === 'none') {
          return <Label content={title} />;
        }
        return <Label color={color} content={title} />;
      },
      sorter: (a, b) => {
        const aValue = RemainStat[a.remain_stat].order;
        const bValue = RemainStat[b.remain_stat].order;
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      },
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'descend',
    },
    {
      title: '입고일시',
      dataIndex: 'stock_at',
      sorter: (a, b) => {
        const aValue = a.stock_at;
        const bValue = b.stock_at;
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '정보업데이트일시',
      dataIndex: 'created_at',
      sorter: (a, b) => {
        const aValue = a.created_at;
        const bValue = b.created_at;
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      },
      sortDirections: ['descend', 'ascend'],
    },
  ];

  const tablePaginationConfig = {
    pageSize: 10,
    position: 'none',
  };

  const onSearch = () => {
    isLoading(true);
    getStoresByAddr({ address: searchValue })
      .then((res) => {
        const { data } = res;
        let resBody;
        if (data.stores) {
          resBody = data;
          resBody.stores.forEach((store) => {
            if (
              !store.remain_stat ||
              (store.remain_stat &&
                !Object.keys(RemainStat).includes(store.remain_stat))
            ) {
              store.remain_stat = 'none';
            }
          });
        } else {
          resBody = data;
        }
        setResult(resBody);
      })
      .finally(() => {
        isLoading(false);
      });
  };

  return (
    <ComponentWrapper>
      <Container>
        <MessageWrapper>
          <Accordion>
            <Accordion.Title
              active={activeNotice}
              index={0}
              onClick={() => {
                setActiveNotice(!activeNotice);
              }}
              style={{ textAlign: 'center' }}
            >
              <Header
                as="h4"
                icon="exclamation circle"
                content="안내사항을 꼭 읽어주세요! (클릭)"
                color="red"
                style={{ display: 'inline' }}
              />
            </Accordion.Title>
            <Accordion.Content active={activeNotice}>
              <Message negative>
                <Message.Content>
                  <Message.List>
                    {NoticeArticles.map((article, index) => (
                      <Message.Item
                        key={index}
                        style={{
                          fontWeight: article.fontWeight,
                        }}
                      >
                        {article.uri ? (
                          <a
                            href={article.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: article.color }}
                          >
                            {article.content}
                          </a>
                        ) : (
                          article.content
                        )}
                      </Message.Item>
                    ))}
                  </Message.List>
                </Message.Content>
              </Message>
            </Accordion.Content>
          </Accordion>
        </MessageWrapper>
      </Container>
      <Container>
        <SearchWrapper onSubmit={onSearch}>
          <Header
            as="h2"
            style={{ fontWeight: 600 }}
            content="검색할 주소를 입력해주세요."
          />
          <div
            style={{ margin: '2rem auto', width: '20rem', textAlign: 'left' }}
          >
            필수입력: 시/도 시/군/구
            <br />
            선택입력: 시/도 시/군/구 읍/면/동
            <br />
            입력예시: 서울특별시 동작구 흑석동
          </div>
          <SearchInputWrapper>
            <Form.Input
              icon={<Icon name="search" link onClick={onSearch} />}
              loading={loading}
              placeholder="검색어를 입력해주세요."
              value={searchValue}
              onChange={(e, { value }) => setSearchValue(value)}
            />
          </SearchInputWrapper>
        </SearchWrapper>
      </Container>
      {result && (
        <ResultWrapper>
          <ResultHeaderWrapper>
            <p>
              <b>&quot;{result.address}&quot;</b>에 위치한 <b>{result.count}</b>
              개 판매처가 검색되었습니다.
            </p>
            <p>
              행 클릭 시, 해당 판매처의 위치가 있는 카카오맵 페이지가 새창으로
              열립니다.
            </p>
          </ResultHeaderWrapper>
          <TableWrapper>
            <Table
              columns={tableColumns}
              rowKey="code"
              dataSource={result.stores}
              loading={isLoading}
              pagination={tablePaginationConfig}
              onRow={(record) => {
                return {
                  onClick: () => {
                    const { name, lat, lng } = record;
                    window.open(
                      `https://map.kakao.com/link/map/${name},${lat},${lng}`,
                      '_blank',
                    );
                  }, // click row
                };
              }}
            />
          </TableWrapper>
        </ResultWrapper>
      )}
    </ComponentWrapper>
  );
};

export default StoreList;
