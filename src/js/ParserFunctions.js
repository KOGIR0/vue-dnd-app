function ParseMonsterJSON(data)
{
    return {
        'Name': data.name,
        'Armor Class': data.armor_class,
        'Challenge Rating': data.challenge_rating,
        'Charisma': data.charisma,
        'Constitution': data.constitution,
        'Damage Immunities': data.damage_immunities.join(','),
        'Damage Resistances': data.damage_resistances.join(','),
        'Damage Vulnerabilities': data.damage_vulnerabilities.join(','),
        'Dexterity': data.dexterity,
        'Hit Dice': data.hit_dice,
        'Hit Points': data.hit_points,
        'Intelligence': data.intelligence,
        'Languages': data.languages,
        'Sences': data.sences,
        'Size': data.size,
        'Strength': data.strength,
        'Type': data.type,
        'Wisdom': data.wisdom,
        'XP': data.xp
    };
}

function ParseSpellJSON(data)
{
    return {
        'Name': data.name,
        'Area of effect': data.hasOwnProperty('area_of_effect') ? data.area_of_effect.type + ' ' + data.area_of_effect.size : '',
        'Casting time': data.casting_time,
        'Classes': data.classes.map((item) => item.name).join(','),
        'Components': data.components.join(','),
        'Concentration': data.concentration.toString(),
        'Desctription': data.desc.join('.'),
        'Duration': data.duration,
        'Level': data.level,
        'Material': data.material,
        'Range': data.range,
        'Ritual': data.ritual.toString(),
        'School': data.school.name,
        'Subclasses': data.subclasses.map((item) => item.name).join(',')
    };
}

function ParseClassJSON(data)
{
    return {
        'Name': data.name,
        'Hit die': data.hit_die,
        'Proficiencies': data.proficiencies.map(item => item.name).join(', '),
        'Subclasses': data.subclasses.map(item => item.name).join(', ')
    };
}

function ParseFeatureJSON(data)
{
    return {
        'Name': data.name,
        'Description': data.desc.join(' '),
        'Level': data.level,
        'Prerequisites': data.prerequisites.join(', ')
    };
}

function ParseSkillJSON(data)
{
    return {
        'Name': data.name,
        'Description': data.desc.join(' ')
    };
}

export { 
    ParseMonsterJSON,
    ParseSpellJSON,
    ParseClassJSON,
    ParseFeatureJSON,
    ParseSkillJSON
}