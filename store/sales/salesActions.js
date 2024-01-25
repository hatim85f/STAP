import moment from "moment";
import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";
import { months } from "../../components/helpers/months";

export const ADD_SALES = "ADD_SALES";
export const GET_SALES = "GET_SALES";
export const GET_SALES_VERSIONS = "GET_SALES_VERSIONS";
export const GET_SINGLE_SALES_VERSIONS = "GET_SINGLE_SALES_VERSIONS";
export const FULL_TEAM_ACHIEVEMENT = "FULL_TEAM_ACHIEVEMENT";
export const GET_MEMBER_ACHIEVEMENT = "GET_MEMBER_ACHIEVEMENT";
export const TEAM_YTD = "TEAM_YTD";
export const INDIVIDUAL_YTD = "INDIVIDUAL_YTD";

export const addSales = (salesData, version, startPeriod, endPeriod) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/sales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        salesData,
        version,
        userId: user._id,
        startPeriod,
        endPeriod,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ADD_SALES,
      salesData,
      version,
    });

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};

export const getSales = (startPeriod, endPeriod) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    window.localStorage.setItem("startDate", startPeriod);
    window.localStorage.setItem("endDate", endPeriod);

    const response = await fetch(
      `${mainLink}/api/sales/${user._id}?startPeriod=${startPeriod}&endPeriod=${endPeriod}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    dispatch({
      type: GET_SALES,
      sales: resData.salesData,
    });
  };
};

export const openSales = (id) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    await fetch(`${mainLink}/api/sales/opened/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        userId: user._id,
      }),
    });
  };
};

export const setIsFinal = (id, userId) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const startDate = window.localStorage.getItem("startDate");
    const endDate = window.localStorage.getItem("endDate");

    const response = await fetch(`${mainLink}/api/sales/set_final/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        userId: userId ? userId : user._id,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    getSales(startDate, endDate);
  };
};

export const changeSingleIsFinal = (id, userId) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const selectedMonth = window.localStorage.getItem("selectedMonth");
    const selectedYear = window.localStorage.getItem("selectedYear");

    const monthNumber =
      months.findIndex((month) => month === selectedMonth) + 1;

    const response = await fetch(`${mainLink}/api/user-sales/single_isFinal`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
        "user-id": user._id,
      },
      body: JSON.stringify({
        salesId: id,
        userId: userId,
        month: monthNumber,
        year: selectedYear,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};

export const addMemberSales = (
  selectedMember,
  salesData,
  version,
  startPeriod,
  endPeriod
) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/user-sales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        userId: selectedMember,
        versionName: version,
        salesData,
        startDate: startPeriod,
        endDate: endPeriod,
        addingUser: user._id,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });
  };
};

export const getSalesVersions = (month, year) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/user-sales/${user._id}/${month}/${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    dispatch({
      type: GET_SALES_VERSIONS,
      salesVersions: resData.salesVersions,
    });
  };
};

export const getSingleUserSales = (userId, month, year) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/member-sales/${userId}/${month}/${parseInt(year)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();
    dispatch({
      type: GET_SINGLE_SALES_VERSIONS,
      memberSales: resData.salesVersions,
    });
  };
};

export const getMemberAchievement = (userId, month, year) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `${mainLink}/api/user-sales/final_ach/${userId}/${month}/${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": getState().auth.token,
        },
      }
    );

    const resData = await response.json();
    dispatch({
      type: GET_MEMBER_ACHIEVEMENT,
      memberAchievement: resData.userAchievement,
    });
  };
};

export const getFullTeamAchievement = (month, year) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/user-sales/team/ach/${user._id}/${month}/${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    dispatch({
      type: FULL_TEAM_ACHIEVEMENT,
      fullTeamAch: resData.teamSales,
    });
  };
};

export const changeIsFinal = (userSalesIds, userIds) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(`${mainLink}/api/user-sales/isFinal`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
        "user-id": user._id,
      },
      body: JSON.stringify({
        userSalesIds,
        userIds,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    const selectedMonth = window.localStorage.getItem("selectedMonth");
    const selectedYear = window.localStorage.getItem("selectedYear");

    const monthNumber =
      months.findIndex((month) => month === selectedMonth) + 1;

    getSalesVersions(monthNumber, selectedYear);
  };
};

export const editSalesData = (userSalesId, salesData) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const selectedMonth = window.localStorage.getItem("selectedMonth");
    const selectedYear = window.localStorage.getItem("selectedYear");

    const monthNumber =
      months.findIndex((month) => month === selectedMonth) + 1;

    const response = await fetch(
      `${mainLink}/api/user-sales/edit/${userSalesId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
          "user-id": user._id,
        },
        body: JSON.stringify({
          salesDetails: salesData,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    getSalesVersions(monthNumber, selectedYear);
  };
};

export const deleteSalesVersion = (salesIds) => {
  return async (dispatch, getState) => {
    const { token, user } = getState().auth;

    const response = await fetch(`${mainLink}/api/user-sales/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
        "user-id": user._id,
      },
      body: JSON.stringify({
        salesIds,
      }),
    });

    const resData = await response.json();
    const selectedMonth = window.localStorage.getItem("selectedMonth");
    const selectedYear = window.localStorage.getItem("selectedYear");

    const monthNumber =
      months.findIndex((month) => month === selectedMonth) + 1;

    dispatch({
      type: ERROR,
      error: resData.error ? resData.error : "Done",
      errorMessage: resData.message,
    });

    getSalesVersions(monthNumber, selectedYear);
  };
};

export const getTeamYTD = (startMonth, endMonth, year) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/user-sales/team_ytd_ach/${user._id}/${startMonth}/${endMonth}/${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    console.log(resData, "resData");

    dispatch({
      type: TEAM_YTD,
      teamYTD: resData.teamAchievement,
      teamTarget: resData.monthlyTargets,
      teamSales: resData.monthlySales,
    });
  };
};

export const getIndividualYTD = (userId, startMonth, endMonth, year) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/user-sales/ytd_ach/${userId}/${startMonth}/${endMonth}/${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    dispatch({
      type: INDIVIDUAL_YTD,
      individualYTD: resData.data,
    });
  };
};
