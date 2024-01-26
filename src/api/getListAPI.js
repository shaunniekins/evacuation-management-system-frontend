import React, { useEffect, useState } from "react";

export const getEvacueeCount = () => {
  const [evacueeCount, setEvacueeCount] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/evacuee_count")
      .then((response) => response.json())
      .then((data) => {
        // console.log(response);
        setEvacueeCount(data.evacuee_count);
      });
  }, []);

  return evacueeCount;
};

export const getFamilyCount = () => {
  const [familyCount, setFamilyCount] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/family_count")
      .then((response) => response.json())
      .then((data) => {
        // console.log(response);
        setFamilyCount(data.family_count);
      });
  }, []);

  return familyCount;
};

export const getMaleCount = () => {
  const [maleCount, setMaleCount] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/male_count")
      .then((response) => response.json())
      .then((data) => {
        // console.log(response);
        setMaleCount(data.male_count);
      });
  }, []);

  return maleCount;
};

export const getFemaleCount = () => {
  const [femaleCount, setFemaleCount] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/female_count")
      .then((response) => response.json())
      .then((data) => {
        // console.log(response);
        setFemaleCount(data.female_count);
        // console.log("Female:", data.female_count);
      });
  }, []);

  return femaleCount;
};

export const getEvacuationCenterCount = () => {
  const [evacCenterCount, setEvacCenterCount] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/evacuation_center_count")
      .then((response) => response.json())
      .then((data) => {
        setEvacCenterCount(data.evacuation_center_count);
      });
  }, []);

  return evacCenterCount;
};

export const getBarangayCount = () => {
  const [barangayCount, setBarangayCount] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/barangay_count")
      .then((response) => response.json())
      .then((data) => {
        // console.log(response);
        setBarangayCount(data.barangay_count);
      });
  }, []);

  return barangayCount;
};

export const getBarangayList = () => {
  const [barangayItem, setBarangayItem] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/barangay_item")
      .then((response) => response.json())
      .then((data) => {
        // console.log(response);
        setBarangayItem(data.barangay_item);
      });
  }, []);

  return barangayItem;
};

export const getMunicipalityList = () => {
  const [municipalityItem, setMunicipalityItem] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/municipality_item")
      .then((response) => response.json())
      .then((data) => {
        // console.log(response);
        setMunicipalityItem(data.municipality_item);
      });
  }, []);

  return municipalityItem;
};
