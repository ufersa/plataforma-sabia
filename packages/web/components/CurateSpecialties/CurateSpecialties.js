import React from 'react';
import styled from 'styled-components';

const CurateSpecialties = () => {
  return (
    <Container>
      <h3>Minhas áreas de atuação</h3>

      <List>
        <ListItem>
          <section>
            <b>Ecologia</b> - Todas
          </section>
          <a href="#">Remover</a>
        </ListItem>
        <ListItem>
          <section>
            <b>Ciências biológicas</b> - Ornintologia
          </section>
          <a href="#">Remover</a>
        </ListItem>
      </List>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  margin-top: 40px;

  h3 {
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray4};
    padding-bottom: 24px;
    color: ${({ theme }) => theme.colors.lightGray2};
  }
`;

const List = styled.ul`
  width: 100%;
`;

const ListItem = styled.li`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray4};
  color: ${({ theme }) => theme.colors.lightGray2};

  a {
    margin-left: auto;
    margin-right: 0;
    font-weight: 700;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.red};
  }
`;

export default CurateSpecialties;
