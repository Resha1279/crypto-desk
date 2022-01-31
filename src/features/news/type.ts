export interface CryptoNews {
  about: {
    name: string;
    readLink: string;
    _type: string;
  }[];
  datePublished: string;
  description: string;
  image: {
    thumbnail: {
      contentUrl: string;
      height: number;
      width: number;
    };
    _type: string;
  };
  mentions: {
    name: string;
    _type: string;
  }[];
  name: string;
  provider: {
    image: {
      _type: string;
      thumbnail: {
        contentUrl: string;
        _type: string;
      };
    };
    name: string;
    _type: string;
  }[];
  url: string;
  _type: string;
}
