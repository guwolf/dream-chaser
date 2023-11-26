const ins = new Potion(10).initTask();
 
// 记录死亡小白鼠
ins.recordDeadMouse([1,2]);
// 得出结论
ins.conclusion();
 
ins.printLabeledPotionList();
ins.printLabledBottleList();
console.log('混合液：');
console.dir(ins.mixedLiquidList);
console.log('投喂了混合液的小白鼠：');
console.dir(ins.mouseList);
console.log(`实验结果：死掉的小白鼠编号是${ins.deadMouseList.join(',')}`);
console.log(`实验结论：有毒的是第${ins.result.potion}瓶药水，最少需要${ins.result.mouseNum}只小白鼠`);