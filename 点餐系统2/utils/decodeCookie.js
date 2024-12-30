// Cookie解析工具
module.exports = function(cookie) {
  const cookies = {};
  if (!cookie) return cookies;
  
  cookie.split(';').forEach(item => {
    const parts = item.split('=');
    cookies[parts[0].trim()] = (parts[1] || '').trim();
  });
  
  return cookies;
};