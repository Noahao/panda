/**
 * @Author: chb
 * @Date:   2022-9-26
 *
 */
import { get } from '@/service/fetch.js'

export const getApiBrandList = (params) => {
  return get({
    url: 'res/api/brand/getApiBrandList',
    loading: false,
    servicePrefix: 'defaultUrl',
    params,
  })
}

/*
 * ��ҳ������Ƭ
 */
export const getNextVisitingCard = (params) => {
  return get({
    url: 'user/api/siteVisitingCard/getNextVisitingCard',
    loading: false,
    servicePrefix: 'defaultUrl',
    params,
  })
}
/*
 * ��ȡ��ҳ������Ƭ����
 */
export const getIndexCityCardInfo = (params) => {
  return get({
    url: 'user/api/siteVisitingCard/getVisitingCard',
    loading: false,
    servicePrefix: 'defaultUrl',
    params,
  })
}

// ��Ƭ����
export const cardDetail = (params) => {
  return get({
    url: 'user/api/siteVisitingCard/cardDetail',
    loading: false,
    servicePrefix: 'defaultUrl',
    params,
  })
}

/***
 * ͨ����Ŀ�����ѯ�Ӽ�
 */
export const getChannelSubset = (params) => {
  return get({
    url: 'res/api/content/channelSubset',
    servicePrefix: 'defaultUrl',
    loading: false,
    params
  })
}
/***
 * ͨ����Ŀ�����ѯȫ���Ӽ�
 */
export const channelcrumbs = (params) => {
  return get({
    url: 'res/api/content/channelcrumbs',
    servicePrefix: 'defaultUrl',
    loading: false,
    params
  })
}

/***
 * ͨ������Ŀ��ѯ��Ӧ�б�
 */
export const getChannelResourceList = (params) => {
  return get({
    url: 'res/api/resource/list',
    servicePrefix: 'defaultUrl',
    loading: false,
    params
  })
}
/**
 * ������Ŀ�б�
 */
export const getChannelList = (params) => {
  return get({
    url: 'res/api/content/channelList',
    servicePrefix: 'defaultUrl',
    loading: false,
    params
  })
}
/**
 * ������Ѷ
 */
export const getNewsList = (params) => {
  return get({
    url: 'res/api/content/list',
    loading: false,
    servicePrefix: 'defaultUrl',
    params
  })
}
// �����б��£�
export const getSimplifyList = (params) => {
  return get({
    url: '/res/api/content/simplifyList',
    loading: false,
    servicePrefix: 'defaultUrl',
    params
  })
}

/**
   * ��ҳ����
   */
export const getIndexTopic = (params) => {
  return get({
    url: 'res/api/topic/apiHomePageList',
    loading: false,
    servicePrefix: 'defaultUrl',
    params
  })
}

// ��Ŀ����
export const getChannelDetail = (params) => {
  return get({
    url: 'res/api/content/channelDetail',
    loading: false,
    servicePrefix: 'defaultUrl',
    params
  })
}

/* ��Ѷ���� */
export const getDetail = (params) => {
  return get({
    url:'res/api/content/detail',
    loading: true,
    servicePrefix: 'defaultUrl',
    params
  })
}
