import Axios from 'axios';

export function unSanitizeIpfsUrl(url: string) {
  return `ipfs://${url}`;
}

export function publicIpfsUrl(url: string) {
  return `https://cloudflare-ipfs.com/ipfs/${url.replace('ipfs://', '')}`;
}

export async function uploadFile(file: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const SLATE_URL = "https://uploads.slate.host/api/public";

  const { status, data } = await Axios.post(SLATE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Basic ${process.env.REACT_APP_SLATE_KEY}`
    }
  });

  if (status < 400) {
    return data.data.cid;
  } else {
    throw new Error('Unable to PIN for reasons');
  }
}
