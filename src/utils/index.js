import moment from 'moment'
export const formatTableDate = (date) => {
    return moment(new Date(date)).format('YYYY-MM-DD')
}
/**
       * @param {array} list
       * @param {object<text,value>} keyIns text value对应结构中的字段
       * @description 参数格式化
       * @return {Array<Object>}
       *  [{text:'xxx', value: 'xxx', children:[{text:'son', value:'son', children:[]}]}]
*/
export const formatData = (list, keyIns) => {
    const result = list.reduce((arr, current) => {
        if (current.children) {
            // 针对children层和父层对应text,value字段相同情况下处理，其他情况需要单独处理
            current.children = formatData(current.children, keyIns);
        }
        current.text = current[keyIns.text];
        current.value = current[keyIns.value];
        arr.push(current);
        return arr;
    }, []);
    return result;
};