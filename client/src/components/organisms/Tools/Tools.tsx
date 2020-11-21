import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { RootState } from '@/store/reducer';
import WebglController from '@/webgl/webglController';
import ButtonGroup from '@/components/molecules/ButtonGroup';
import UploadArea from '@/components/molecules/UploadArea';

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

interface button {
  onClick: () => void;
  message: string;
  type: 'default' | 'transparent';
  children: React.ReactChild;
}

interface Props {
  videoBuffer: ArrayBuffer;
}

const getEditToolsData = (
  rotateLeft90Degree: () => void,
  rotateRight90Degree: () => void,
  reverseUpsideDown: () => void,
  reverseSideToSide: () => void,
  enlarge: () => void,
  reduce: () => void
): button[] => [
    {
      onClick: rotateLeft90Degree,
      message: "Left 90'",
      type: 'transparent',
      children: null,
    },
    {
      onClick: rotateRight90Degree,
      message: "Right 90'",
      type: 'transparent',
      children: null,
    },
    {
      onClick: reverseUpsideDown,
      message: 'Up to Down',
      type: 'transparent',
      children: null,
    },
    {
      onClick: reverseSideToSide,
      message: 'Side to Side',
      type: 'transparent',
      children: null,
    },
    { onClick: enlarge, message: 'enlarge', type: 'transparent', children: null },
    { onClick: reduce, message: 'reduce', type: 'transparent', children: null },
  ];

const EditTool = styled(ButtonGroup)``;
const VideoTool = styled(ButtonGroup)``;

const Tools: React.FC<Props> = ({ videoBuffer }) => {
  let webglController;
  if (videoBuffer) {
    webglController = new WebglController(
      URL.createObjectURL(new Blob([videoBuffer], { type: 'video/mp4' }))
    );
    webglController.main();
  }

  const rotateLeft90Degree = () => webglController.rotateLeft90Degree();
  const rotateRight90Degree = () => webglController.rotateRight90Degree();
  const reverseUpsideDown = () => webglController.reverseUpsideDown();
  const reverseSideToSide = () => webglController.reverseSideToSide();
  const enlarge = () => webglController.enlarge();
  const reduce = () => webglController.reduce();

  return (
    <StyledDiv>
      <VideoTool buttonData={[]} />
      <EditTool
        buttonData={getEditToolsData(
          rotateLeft90Degree,
          rotateRight90Degree,
          reverseUpsideDown,
          reverseSideToSide,
          enlarge,
          reduce
        )}
      />
      <UploadArea />
    </StyledDiv>
  );
};

export default connect((state: RootState) => ({
  videoBuffer: state.originalVideo.video,
}))(Tools);