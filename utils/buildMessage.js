function buildMessage(entity, action) { // eslint-disable-line
  if(action === 'list') {
    return `${entity}s ${action}ed`;
  }
  return `${entity} ${action}d`;
}

module.exports = buildMessage;