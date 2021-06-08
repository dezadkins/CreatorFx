import React, { useState, useRef } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./AddPetForm.css";
import { useParams, useHistory } from "react-router-dom";

function AddPetForm() {
  const [name, setName] = useState("");
  const [petType, setPetType] = useState([]);
  const [species, setSpecies] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  // const [photoLoad, setPhotoLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);
  const { petId } = useParams();

  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photoURL) {
      setErrors(<p id="errorMsg">Please upload an image!</p>);
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("species", species);
    formData.append("birthDate", birthDate);
    formData.append("photoURL", photoURL);
    try {
      let result = await fetch("/api/pets/", {
        method: "POST",
        body: formData,
      });
      if (!result.ok) throw result;
      return history.pushState("/");
    } catch (err) {
      console.error(err);
    }
  };

  const uploadInput = useRef(null);

  const handleUploadClick = (e) => {
    uploadInput.current.click();
  };

  const updateFile = (e) => {
    const {
      target: {
        validity,
        files: [file],
      },
    } = e;
    e.target.files[0]
      ? setPhotoPreview(URL.createObjectURL(e.target.files[0]))
      : setPhotoPreview(null);

    return validity.valid && setPhotoURL(file);
  };

  return (
    <form className="addPet__form" onSubmit={handleSubmit}>
      <h1 className="form-title">New Addition</h1>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>

      <div className="add-pet__form-container">
        <div className="add-pet__form-fields">
          <input
            ref={uploadInput}
            type="file"
            name="file"
            onChange={updateFile}
            className="image-upload"
          >
            Upload Image Here
          </input>
          <div className="upload-box">
            <button className="upload-button" onClick={handleUploadClick}>
              Upload
            </button>
          </div>
          <div className="all-input">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>
              Pet Type:
              <select
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Ferret">Ferret</option>
                <option value="Horse">Horse</option>
                <option value="Pig">Pig</option>
              </select>
            </label>
            <div>
              <input
                type="text"
                placeholder="Breed"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="D.O.B"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </div>
      <button className="submit-button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default AddPetForm;
