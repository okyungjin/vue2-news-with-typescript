import axios from 'axios';
import { handleException } from '../utils/handler';

const config = {
  baseUrl: 'https://api.hnpwa.com/v0',
};

const fetchList = async (name: string) => {
  try {
    return await axios.get(`${config.baseUrl}/${name}/1.json`);
  } catch (error) {
    handleException(error);
    return error;
  }
};

const fetchUser = async (userName: string): Promise<any> => {
  try {
    return await axios.get(`${config.baseUrl}/user/${userName}.json`);
  } catch (error) {
    handleException(error);
    return Error;
  }
};

const fetchItem = async (itemId: string): Promise<any> => {
  try {
    return await axios.get(`${config.baseUrl}/item/${itemId}.json`);
  } catch (error) {
    handleException(error);
    return Error;
  }
};

export { fetchList, fetchUser, fetchItem };
