import styled from "styled-components";

const PageContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding-top: 10%;
  z-index: 1;
`;

const VidOverlay = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

export default function NewCollection() {
  return (
    <>
      <PageContainer>
        <div>
          <video className="videoBG" poster="poster.JPG" autoPlay muted loop>
            <source
              src={window.location.origin + "/comingSoon.mp4"}
              type="video/mp4"
            />
          </video>
          <VidOverlay></VidOverlay>

          {/* <div className="footer__box">
          <Footer />
        </div> */}
        </div>
      </PageContainer>
    </>
  );
}
