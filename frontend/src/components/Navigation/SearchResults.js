import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: column;
  background-color: #323f4b;
  grid-area: main-view;
  overflow-y: scroll;
  margin-left: 10px;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
`;
const SectionTitle = styled.h2`
  display: block;
  font-size: 20px;
  line-height: 64px;

  color: #f5f7f9;
`;

const PlayDisplay = styled.div`
  visibility: hidden;
  display: none;
  display: flex;
  background-color: rgba(31, 41, 51, 0.8);
  justify-content: center;
  padding: 0;
  left: 0;
  transition: visibility 0.1s ease-in;
  min-height: 100%;
  min-width: 100%;
  align-items: center;
  position: absolute;
  margin-right: 20px;
  color: #f5f7f9;
`;
const PlayText = styled.span`
  // background-color: #c054eb;
  border: 0px;
  margin-top: -30px;
  height: 33.33px;
  width: 60%;
  letter-spacing: 0.1rem;
  color: #f5f7f9;
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  font-size: 0.7rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

const Fx = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-right: 20px;
  background-color: rgba(31, 41, 51, 0.57);
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  position: relative;
  &:hover ${PlayDisplay} {
    visibility: visible;
    display: flex;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-right: 20px;
  background-color: rgba(31, 41, 51, 0.57);
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  &:hover {
    cursor: pointer;
  }
`;

const Artwork = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 3px;
`;

const UserImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 75px;
`;

const FxTitle = styled.h2`
  display: block;
  font-size: 14px;
  margin-top: 14px;
  margin-bottom: 4px;
  width: 100px;
  color: #f5f7f9;
`;

const FxArtist = styled.h2`
  display: block;
  font-size: 10px;

  color: #9ea5ad;
`;

const SectionContent = styled.div`
  width: 85vw;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  margin-bottom: 0px;
  min-height: 233px;
`;

const NotFound = styled.div`
  display: flex;
  flex-direction: column;
`;

const NotFoundTitle = styled.h2`
  display: block;
  font-size: 17px;
  line-height: 17px;
  text-align: left;
  color: #9ea5ad;
`;

const NotFoundDescription = styled.h3`
  display: block;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #9ea5ad;
`;

export default function SearchResults({ setCurrentlyPlaying }) {
  const history = useHistory();
  const users = useSelector((state) => {
    return state.search.users;
  });

  const fxes = useSelector((state) => {
    return state.search.fxes;
  });

  const term = useSelector((state) => {
    return state.search.term;
  });

  const handleClick = (e, fx) => {
    e.preventDefault();
    setCurrentlyPlaying(fx);
  };

  return (
    <Main>
      <Section>
        <SectionTitle>Fx results for "{term}"</SectionTitle>
        <SectionContent>
          {fxes && fxes[0] ? (
            fxes.map((fx) => (
              <Fx
                onClick={(e) =>
                  handleClick(e, {
                    audio: fx.audio,
                    title: fx.title,
                    artwork: fx.artwork,
                  })
                }
                key={fx.id}
              >
                <PlayDisplay>
                  <PlayText>PLAY</PlayText>
                </PlayDisplay>
                <Artwork src={fx.artwork} alt="artwork" />
                <fxTitle>
                  {fx.title.length > 10
                    ? fx.title.slice(0, 10) + "..."
                    : fx.title}
                </fxTitle>
                <FxArtist>{fx.User.username}</FxArtist>
              </Fx>
            ))
          ) : (
            <NotFound>
              <NotFoundTitle>No Fx results found for "{term}"</NotFoundTitle>
              <NotFoundDescription>
                Please make sure your words are spelled correctly or use less or
                different keywords."
              </NotFoundDescription>
            </NotFound>
          )}
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>Artist results for "{term}"</SectionTitle>
        <SectionContent>
          {users && users[0] ? (
            users.map((user) => (
              <User
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/users/${user.id}`);
                }}
                key={user.id}
              >
                <UserImage
                  src={window.location.origin + "/imagePlaceholder.jpg"}
                  alt="avatar"
                />
                <FxTitle>
                  {" "}
                  {user.username.length > 10
                    ? user.username.slice(0, 10) + "..."
                    : user.username}
                </FxTitle>
              </User>
            ))
          ) : (
            <NotFound>
              <NotFoundTitle>
                No artist results found for "{term}"
              </NotFoundTitle>
              <NotFoundDescription>
                Please make sure your words are spelled correctly or use less or
                different keywords."
              </NotFoundDescription>
            </NotFound>
          )}
        </SectionContent>
      </Section>
    </Main>
  );
}
