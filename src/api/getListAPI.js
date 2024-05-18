import React, { useEffect, useState } from "react";
import { BASE_URL } from "../urlConfig";

export const getEvacueeCount = () => {
  const [evacueeCount, setEvacueeCount] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/api/evacuee_count`)
      .then((response) => response.json())
      .then((data) => {
        setEvacueeCount(data.evacuee_count);
      });
  }, []);

  return evacueeCount;
};

export const getFamilyCount = () => {
  const [familyCount, setFamilyCount] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/api/family_count`)
      .then((response) => response.json())
      .then((data) => {
        setFamilyCount(data.family_count);
      });
  }, []);

  return familyCount;
};

export const getMaleCount = () => {
  const [maleCount, setMaleCount] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/api/male_count`)
      .then((response) => response.json())
      .then((data) => {
        setMaleCount(data.male_count);
      });
  }, []);

  return maleCount;
};

export const getFemaleCount = () => {
  const [femaleCount, setFemaleCount] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/api/female_count`)
      .then((response) => response.json())
      .then((data) => {
        setFemaleCount(data.female_count);
      });
  }, []);

  return femaleCount;
};

export const getEvacuationCenterCount = () => {
  const [evacCenterCount, setEvacCenterCount] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/api/evacuation_center_count`)
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
    fetch(`${BASE_URL}/api/barangay_count`)
      .then((response) => response.json())
      .then((data) => {
        setBarangayCount(data.barangay_count);
      });
  }, []);

  return barangayCount;
};

export const getBarangayList = () => {
  const [barangayItem, setBarangayItem] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/barangay_item`)
      .then((response) => response.json())
      .then((data) => {
        setBarangayItem(data.barangay_item);
      });
  }, []);

  return barangayItem;
};

export const getMunicipalityList = () => {
  const [municipalityItem, setMunicipalityItem] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/municipality_item`)
      .then((response) => response.json())
      .then((data) => {
        setMunicipalityItem(data.municipality_item);
      });
  }, []);

  return municipalityItem;
};