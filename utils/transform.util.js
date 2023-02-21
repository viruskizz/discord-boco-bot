module.exports = {
  covertArrayArgsToObjectArgs(arrayArgs) {
    const obj = {};
    arrayArgs.forEach(s => {
      const el = s.substring(2).split('=');
      Object.assign(obj, {
        [el[0]]: el.slice(1).join('='),
      });
    });
    return obj;
  },
  selectedVideoInfo(metaInfo) {
    return {
      videoId: metaInfo.videoId,
      title: metaInfo.title,
      videoUrl: metaInfo.video_url,
      time: metaInfo.lengthSeconds,
      thumbnails: metaInfo.thumbnails.slice(-1),
    }
  },
  convertSecondToString(seconds) {
    const datetime = new Date(seconds * 1000).toISOString().slice(11, 19);
    const times = datetime.split(':');
    let str = '';
    const h = parseInt(times[0]);
    const m = parseInt(times[1]);
    const s = parseInt(times[2]);
    if (h > 0) { str += h + 'h'; }
    if (m > 0) { str += m + 'm'; }
    if (s > 0) { str += s + 's'; }
    return str;
  }
};
