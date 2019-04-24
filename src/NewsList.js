import React from "react";
import styled from "styled-components";

import News from "./News";

const Container = styled.div`
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
`;

class NewsList extends React.Component {
  render() {
    const { list } = this.props;
    return (
      <Container>
        {list.map(({ id }, index) => (
          <News
            key={id}
            id={id}
            width={100+ (index%3*100) + Math.round(20 + Math.random() *50)}
            height={33+(index%5*9)}
          />
        ))}
      </Container>
    );
  }
}
export default NewsList;
