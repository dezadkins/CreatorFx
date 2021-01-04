import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import fetch from "../../store/csrf";
import Loader from "../Loader/Loader";
import { Player } from "../Player/Player";
import "./Profile.css";

const ProfileContainer = styled.div`
  grid-area: main-view;
  overflow-y: scroll;
  // border: 1px solid white;
  margin-top: 38px;
`;
const Header = styled.div`
  display: flex;
  background: rgb(176, 158, 158);
  background: linear-gradient(
    0deg,
    rgba(176, 158, 158, 1) 0%,
    rgba(62, 62, 57, 1) 100%
  );
  padding: 30px;
`;

const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

const ProfileName = styled.h2`
  display: block;
  font-size: 70px;
  font-family: "Cuprum", sans-serif;

  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #f5f7f9;
`;

const ProfileExtra = styled.h3`
  display: block;
  font-size: 18px;
  font-family: "Cuprum", sans-serif;

  margin-top: 20px;
  margin-left: 20px;
  color: #9ea5ad;
`;

const Avatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const Main = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: column;
  background: rgb(176, 158, 158);
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const SectionTitle = styled.h2`
  display: block;
  font-size: 20px;
  line-height: 64px;
  font-family: "Cuprum", sans-serif;

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
  background-color: #ff0031;
  border: 0px;
  margin-top: -30px;
  height: 33.33px;
  width: 60%;
  letter-spacing: 0.1rem;
  color: #f5f7f9;
  border-radius: 5px;
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

const Artwork = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 3px;
`;

const FxTitle = styled.h2`
  display: block;
  font-size: 14px;
  font-family: "Cuprum", sans-serif;

  margin-top: 14px;
  margin-bottom: 4px;
  width: 100px;
  color: #f5f7f9;
`;

const FxArtist = styled.h2`
  display: block;
  font-size: 10px;
  font-family: "Cuprum", sans-serif;

  color: #9ea5ad;
`;

const SectionContent = styled.div`
  width: 85vw;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  margin-bottom: 0px;
`;

const ActionContainer = styled.div`
  margin-top: 10px;
  display: flex;
  background-color: #32;
  padding-bottom: 10px;
`;

const EditFxButton = styled(NavLink)`
  background-color: #323f4b;
  border: 0px;
  height: 33.33px;
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
  text-decoration: none;
  width: 50px;
  height: 10px;
  z-index: 3;
`;

const DeleteFxButton = styled.button`
  background-color: #ff0031;
  border: 0px;
  height: 33.33px;
  letter-spacing: 0.1rem;
  color: #f5f7f9;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  font-size: 0.7rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 10px;
  z-index: 3;
`;

const NotFound = styled.div`
  display: flex;
  flex-direction: column;
`;

const NotFoundTitle = styled.h2`
  display: block;
  font-size: 17px;

  font-family: "Cuprum", sans-serif;
  line-height: 17px;
  text-align: left;
  color: #ff0031;
`;

const NotFoundDescription = styled.h3`
  display: block;
  font-size: 14px;

  font-family: "Cuprum", sans-serif;
  line-height: 16px;
  text-align: center;
  color: #ff0031;
`;

export default function MyProfile({ userId }) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fxes, setFxes] = useState([]);
  const [fxDeleted, setFxDeleted] = useState(false);
  const [profile, setProfile] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const sessionUser = useSelector((state) => state.session.user);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMyFx = async (userId) => {
      try {
        setLoading(true);
        const res = await fetch(`/api/profiles/${userId}`);

        const fxes = res.data;

        if (fxes) setFxes(fxes);

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMyFx(userId);

    return function cleanup() {
      setFxes([]);
    };
  }, [userId, fxDeleted]);

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        setLoading(true);
        const res = await fetch(`/api/users/${userId}`);

        const user = res.data;

        if (user) setUser(user);

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser(userId);

    return function cleanup() {
      setUser(null);
    };
  }, [userId]);

  useEffect(() => {
    (async () => {
      let res = await fetch(`/api/session`);
      setProfilePic(res.data.user.profilePicURL);
    })();
  }, [sessionUser]);

  const handleClick = (e, fx) => {
    e.preventDefault();
    setCurrentlyPlaying(fx);
  };

  const handleDelete = async (e, fxId) => {
    e.preventDefault();
    setFxDeleted(true);
    const res = await fetch(`/api/fxes/${fxId}`, {
      method: "DELETE",
    });

    if (res && res.data) {
      setFxes(
        fxes.filter((fx) => {
          return fx !== res.data;
        })
      );

      setFxDeleted(false);
    }
  };

  return (
    <>
      <ProfileContainer>
        <Header>
          {profilePic && (
            <Avatar
              src={
                profilePic +
                `?uniqueQuery=${encodeURI(new Date().toISOString())}`
              }
            />
          )}
          {!profilePic && (
            <Avatar src={window.location.origin + "/imagePlaceholder.jpg"} />
          )}
          <ProfileDetail>
            <ProfileName>{user ? user.username : loading}</ProfileName>
            <ProfileExtra>{fxes.length} uploaded fx</ProfileExtra>
          </ProfileDetail>
        </Header>
        <Main>
          <Section>
            <SectionTitle>Uploaded Fx</SectionTitle>
            <SectionContent>
              {loading ? (
                <Loader></Loader>
              ) : fxes[0] ? (
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
                    <FxTitle>
                      {fx.title.length > 10
                        ? fx.title.slice(0, 10) + "..."
                        : fx.title}
                    </FxTitle>
                    <FxArtist>{fx.User.username}</FxArtist>
                    <ActionContainer>
                      <EditFxButton to={`/fxes/${fx.id}/edit`}>
                        ...
                      </EditFxButton>
                      <DeleteFxButton onClick={(e) => handleDelete(e, fx.id)}>
                        Del
                      </DeleteFxButton>
                    </ActionContainer>
                  </Fx>
                ))
              ) : (
                <NotFound>
                  <NotFoundTitle> No Uploaded Fx</NotFoundTitle>
                  <NotFoundDescription>
                    Click on the upload button to start your collection!
                  </NotFoundDescription>
                </NotFound>
              )}
            </SectionContent>
          </Section>
        </Main>
      </ProfileContainer>
      {currentlyPlaying ? (
        <Player
          streamUrl={currentlyPlaying.audio}
          trackTitle={currentlyPlaying.title}
          preloadType="auto"
        />
      ) : null}
    </>
  );
}
