import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer";

import fetch from "../../store/csrf";
import Loader from "../Loader/Loader";
import { Player } from "../Player/Player";
import SearchResults from "../Navigation/SearchResults";

const Main = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: column;
  background: linear-gradient(
    0deg,
    rgba(176, 158, 158, 1) 0%,
    rgba(62, 62, 57, 1) 100%
  );
  grid-area: main-view;
  // overflow-y: scroll;
  margin-left: 10px;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: flex-start;

  margin: 0;
`;
const SectionTitle = styled.h2`
  display: block;
  font-size: 28px;
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
  border-radius: 5px;
`;
const FxTitle = styled.h2`
  display: flex;
  justify-content: center
  align-items: center;
  font-size: 18px;
  margin-top: 14px;
  margin-bottom: 4px;
  width: 100%;
  color: #f5f7f9;
  font-family: "Cuprum", sans-serif;
  
`;
const FxArtist = styled.h2`
  display: flex;
  // justify-content: center;
  font-size: 14px;
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
  min-height: 233px;
  // z-index: 1;
`;

export default function ProfilePage() {
  //State
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fxes, setFxes] = useState([]);
  const [users, setUsers] = useState([]);
  const [searching, setSearching] = useState(false);

  //Map State to props
  const user = useSelector((state) => {
    return state.session.user;
  });

  const term = useSelector((state) => {
    return state.search.term;
  });

  const history = useHistory();

  useEffect(() => {
    if (term === "") {
      setSearching(false);
    } else {
      setSearching(true);
    }

    return function cleanup() {
      setSearching(false);
    };
  }, [term]);

  useEffect(() => {
    const fetchFxes = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/fxes`);
        const fxes = res.data;
        if (fxes) setFxes(fxes);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFxes();

    return function cleanup() {
      setFxes([]);
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/users`);

        const users = res.data;

        if (users) setUsers(users);

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
    return function cleanup() {
      setUsers([]);
    };
  }, []);

  //Authorization
  if (!user) {
    return <Redirect to="/home" />;
  }

  //Event Handlers
  const handleClick = (e, fx) => {
    e.preventDefault();
    setCurrentlyPlaying(fx);
  };

  return (
    <>
      {searching ? (
        <SearchResults setCurrentlyPlaying={setCurrentlyPlaying} />
      ) : (
        <Main>
          <Section>
            <SectionTitle>Newly Added </SectionTitle>
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
                  </Fx>
                ))
              ) : (
                <div>No Fx Here</div>
              )}
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>Creators</SectionTitle>
            <SectionContent>
              {loading ? (
                <Loader></Loader>
              ) : users[0] ? (
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
                      {user.username.length > 20
                        ? user.username.slice(0, 20) + "..."
                        : user.username}
                    </FxTitle>
                  </User>
                ))
              ) : (
                <div>No Users</div>
              )}
            </SectionContent>
          </Section>
        </Main>
      )}

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
