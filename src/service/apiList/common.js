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
 * 首页城市名片
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
 * 获取首页城市名片详情
 */
export const getIndexCityCardInfo = (params) => {
  return get({
    url: 'user/api/siteVisitingCard/getVisitingCard',
    loading: false,
    servicePrefix: 'defaultUrl',
    params,
  })
}

// 名片详情
export const cardDetail = (params) => {
  return get({
    url: 'user/api/siteVisitingCard/cardDetail',
    loading: false,
    servicePrefix: 'defaultUrl',
    params,
  })
}

/***
 * 通过栏目代码查询子集
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
 * 通过栏目代码查询全部子集
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
 * 通过子栏目查询对应列表
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
 * 内容栏目列表
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
 * 新闻资讯
 */
export const getNewsList = (params) => {
  return get({
    url: 'res/api/content/list',
    loading: false,
    servicePrefix: 'defaultUrl',
    params
  })
}
// 新闻列表（新）
export const getSimplifyList = (params) => {
  return get({
    url: '/res/api/content/simplifyList',
    loading: false,
    servicePrefix: 'defaultUrl',
    params
  })
}

/**
   * 首页话题
   */
export const getIndexTopic = (params) => {
  return get({
    url: 'res/api/topic/apiHomePageList',
    loading: false,
    servicePrefix: 'defaultUrl',
    params
  })
}

// 栏目详情
export const getChannelDetail = (params) => {
  return get({
    url: 'res/api/content/channelDetail',
    loading: false,
    servicePrefix: 'defaultUrl',
    params
  })
}

/* 资讯详情 */
export const getDetail = (params) => {
  return get({
    url:'res/api/content/detail',
    loading: true,
    servicePrefix: 'defaultUrl',
    params
  })
}
