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
    const { error, list, width, height } = this.props;
    return (
      <Container>
        {list.map(({ id, width, height }, index) => (
          <News
            key={id}
            id={id}
            width={width}
            height={height}
          />
        ))}
      </Container>
    );
  }
}
export default NewsList;
