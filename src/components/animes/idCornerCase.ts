
const idLists: string[][] = [
    ['dungeon-ni-deai-wo-motomeru-no-wa-machigatteiru-darou-ka-iv-shin-shou-meikyuu-hen', 'dungeon-ni-deai-wo-motomeru-no-wa-machigatteiru-darou-ka-iv']
]

export const checkUrl = function (id: string) {
    var rightId = id;
    idLists.forEach((item: string[]) => {
        if (item[0] === id) {
            rightId = item[1];
            return rightId;
        }
    })

    return rightId;
}